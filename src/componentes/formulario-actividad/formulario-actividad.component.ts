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
  @Input() actividad: any = {
    descripcion: '',
    fecha_entrega: '',
    id_usuario: '',
    estado_actividad: '',
    nombre_actividad: ''
  };
  @Input() editMode: boolean = false; // Determina si está en modo edición
  @Output() onSave = new EventEmitter(); // Emite evento cuando se guarda o actualiza

  constructor(private actividadesService: ActividadesService, private router: Router) {}

  // Guardar o actualizar actividad
  guardarActividad(): void {
    if (this.editMode) {
      // Actualizar actividad
      this.actividadesService.actualizarActividad(this.actividad.id, this.actividad).subscribe({
        next: (response) => {
          console.log('Actividad actualizada:', response);
          this.onSave.emit(); // Notificar al componente padre que se realizó la acción
          this.router.navigate(['/actividades']); // Redirigir al listado
        },
        error: (err) => {
          console.error('Error al actualizar actividad:', err);
        }
      });
    } else {
      // Crear actividad
      this.actividadesService.crearActividad(this.actividad).subscribe({
        next: (response) => {
          console.log('Actividad creada:', response);
          this.onSave.emit(); // Notificar al componente padre que se realizó la acción
          this.router.navigate(['/actividades']); // Redirigir al listado
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
