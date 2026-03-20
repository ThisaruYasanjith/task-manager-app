import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  private taskService = inject(TaskService);
  tasks = signal<Task[]>([]);
  searchTerm = signal<string>('');
  errorMessage = signal<string | null>(null); // For backend errors

  filteredTasks = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.tasks().filter(
      (task) =>
        task.title.toLowerCase().includes(term) || task.description.toLowerCase().includes(term),
    );
  });

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getAllTasks().subscribe({
      next: (data) => {
        this.tasks.set(data);
        this.errorMessage.set(null);
      },
      error: () => {
        this.errorMessage.set('Backend Connection Error: Check if server is running.' );
      },
    });
  }

  hasTasks(status: string): boolean {
    return this.filteredTasks().some((t) => t.status === status);
  }

  deleteTask(id: number | undefined): void {
    if (id && confirm('Delete this task?')) {
      this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
    }
  }
}
