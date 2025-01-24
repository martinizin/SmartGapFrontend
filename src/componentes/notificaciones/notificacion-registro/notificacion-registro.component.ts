import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-notificacion-registro',
  imports: [CommonModule],
  templateUrl: './notificacion-registro.component.html',
  styleUrl: './notificacion-registro.component.css'
})
export class NotificacionRegistroComponent {
  @Input() mensaje: string = 'CUENTA CREADA EXITÓSAMENTE!'; // Mensaje que se mostrará
  @Input() visible: boolean = false; // Controla la visibilidad de la notificación

  ocultarNotificacion() {
    this.visible = false; // Oculta la notificación
  }
}
