import { Component, OnInit, signal, inject } from '@angular/core';
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

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getAllTasks().subscribe((data) => this.tasks.set(data));
  }

  deleteTask(id: number | undefined): void {
    if (id && confirm('Delete this task?')) {
      this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
    }
  }
}
