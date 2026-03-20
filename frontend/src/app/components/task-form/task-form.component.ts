import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './task-form.component.html',
})
export class TaskFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private taskService = inject(TaskService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  taskForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: [''],
    status: ['TO_DO'],
  });

  isEdit = false;
  id?: number;

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEdit = true;
      this.id = +idParam;
      this.taskService.getTaskById(this.id).subscribe((task) => this.taskForm.patchValue(task));
    }
  }

  save(): void {
    if (this.taskForm.valid) {
      const obs = this.isEdit
        ? this.taskService.updateTask(this.id!, this.taskForm.value)
        : this.taskService.createTask(this.taskForm.value);
      obs.subscribe(() => this.router.navigate(['/']));
    }
  }
}
