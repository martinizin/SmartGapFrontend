import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActividadesService } from '../../servicios/actividades.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario-actividad',
  imports: [CommonModule,FormsModule],
  templateUrl: './formulario-actividad.component.html',
  styleUrl: './formulario-actividad.component.css'
})
export class FormularioActividadComponent {
  estadosDisponibles: string[] = ['Realizado', 'Pendiente']; // Lista de estados posibles

  @Input() actividad: any = {
    descripcion: '',
    fecha_entrega: '',
    id_usuario: '',
    nombre_actividad: '',
    estado_actividad: ''
  };

  @Input() editMode: boolean = false; // Indica si el formulario está en modo de edición
  @Output() onSave = new EventEmitter<void>(); // Evento para notificar al componente padre después de guardar

  constructor(
    private actividadesService: ActividadesService,
    private router: Router
  ) {}

  // Guardar o actualizar actividad
  guardarActividad(): void {
    if (!this.actividad.estado_actividad || !this.actividad.descripcion || !this.actividad.nombre_actividad) {
      console.error('Por favor, completa todos los campos obligatorios.');
      return;
    }

    if (this.editMode) {
      // Actualizar actividad existente
      this.actividadesService.actualizarActividad(this.actividad.id, this.actividad).subscribe({
        next: (response) => {
          console.log('Actividad actualizada:', response);
          this.onSave.emit(); // Emitir evento al componente padre
          this.router.navigate(['/actividades']); // Redirigir al listado de actividades
        },
        error: (err) => {
          console.error('Error al actualizar actividad:', err);
        }
      });
    } else {
      // Crear nueva actividad
      this.actividadesService.crearActividad(this.actividad).subscribe({
        next: (response) => {
          console.log('Actividad creada:', response);
          this.onSave.emit(); // Emitir evento al componente padre
          this.router.navigate(['/actividades']); // Redirigir al listado de actividades
        },
        error: (err) => {
          console.error('Error al crear actividad:', err);
        }
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/actividades']); // Redirigir al listado de actividades
  }
}
