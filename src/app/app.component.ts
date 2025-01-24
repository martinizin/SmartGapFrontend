import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificacionRegistroComponent } from '../componentes/notificaciones/notificacion-registro/notificacion-registro.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
