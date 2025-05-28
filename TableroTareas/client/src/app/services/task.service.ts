import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private socket!: Socket;

  constructor() {
    this.socket = io({
  path: '/ws/', 
  transports: ['websocket']
});


  }

  addTask(text: string) {
    this.socket.emit('addTask', text);
  }

  deleteTask(id: number) {
    console.log('Deleting task with id:', id);
    this.socket.emit('deleteTask', id);
  }

  toggleTask(id: number): void {
    this.socket.emit('toggleTask', id);
  }

  onInitialTasks(): Observable<Task[]> {
    return new Observable<Task[]>(observer => {
      this.socket.on('initialTasks', (tasks: Task[]) => {
        console.log('Received initial tasks:', tasks);
        observer.next(tasks);
      });
    });
  }

  onTaskAdded(): Observable<Task> {
    return new Observable<Task>(observer => {
      this.socket.on('taskAdded', (task: Task) => {
        observer.next(task);
      });
    });
  }

  onTaskDeleted(): Observable<number> {
    return new Observable<number>(observer => {
      this.socket.on('taskDeleted', (id: number) => {
        observer.next(id);
      });
    });
  }

  onTaskToggled(): Observable<Task> {
    return new Observable<Task>(observer => {
      this.socket.on('taskUpdated', (task: Task) => {
        observer.next(task);
      });
    });
  }




}

export interface Task {
  id: number;
  text: string;
  completed: boolean;
}