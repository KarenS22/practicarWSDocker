import { Component, ElementRef, Host, HostListener, OnInit, ViewChild } from '@angular/core';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-pizarra',
  imports: [],
  templateUrl: './pizarra.component.html',
  styleUrl: './pizarra.component.scss'
})
export class PizarraComponent implements OnInit{
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private drawing = false;

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;

    this.socketService.onDraw().subscribe((data) => {
      this.drawOnCanvas(data, false);
    });

    this.socketService.onClear().subscribe(() => {
      this.clearCanvas();
    });
  }

  @HostListener('window:mouseup') onMouseUp() {
    this.drawing = false;
  }

  onMouseDown(event: MouseEvent) {
    this.drawing = true;
    this.draw(event);
  }

  onMouseMove(event: MouseEvent) {
    if (this.drawing) {
      this.draw(event);
    }
  }

  draw(event: MouseEvent) {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const data = { x, y };
    this.drawOnCanvas(data, true);
    this.socketService.emitDraw(data);
  }

  drawOnCanvas(data: { x: number; y: number }, local: boolean) {
    this.ctx.fillStyle = 'black';
    this.ctx.beginPath();
    this.ctx.arc(data.x, data.y, 2, 0, Math.PI * 2);
    this.ctx.fill();
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
  }

  clear() {
    this.clearCanvas();
    this.socketService.emitClear();
  }




}
