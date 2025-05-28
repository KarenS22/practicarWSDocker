import { Component, OnInit } from '@angular/core';
import { Task, TaskService } from './services/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'TableroTareas';
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.onInitialTasks().subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });

    this.taskService.onTaskAdded().subscribe((task: Task) => {
      this.tasks.push(task);
    });

    this.taskService.onTaskDeleted().subscribe((id: number) => {
      this.tasks = this.tasks.filter(task => task.id !== id);
    });
    this.taskService.onTaskToggled().subscribe((task: Task) => {
      const index = this.tasks.findIndex(t => t.id === task.id);
      if (index !== -1) {
        this.tasks[index] = task;
      }
    });

  }

  addTask(text: string) {
    if (text.trim()) {
      this.taskService.addTask(text);
    }
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id);
  }

  toggleTask(id: number): void {
    this.taskService.toggleTask(id);
  }
  
}
