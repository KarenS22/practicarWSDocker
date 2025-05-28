import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket!: Socket;

  constructor() { 
    this.socket = io('http://192.168.3.41:3000');
  }

  emitDraw(data: {x:number, y:number}){
    this.socket.emit('draw', data);
  }

  onDraw(): Observable<{x:number, y:number}> {
    return new Observable((observer) => {
      this.socket.on('draw', (data) => {
        observer.next(data);
      });
    });
  }

  emitClear() {
    this.socket.emit('clear');
  }

  onClear(): Observable<void> {
    return new Observable((observer) => {
      this.socket.on('clear', () => {
        observer.next();
      });
    });
  }
}
