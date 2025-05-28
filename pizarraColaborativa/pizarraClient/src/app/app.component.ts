import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PizarraComponent } from "./pizarra/pizarra.component";

@Component({
  selector: 'app-root',
  imports: [PizarraComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pizarraClient';
}
