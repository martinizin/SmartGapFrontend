import { Component,OnInit } from '@angular/core';
import { ActividadesService } from '../../servicios/actividades.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actividades',
  imports: [FormsModule, CommonModule],
  templateUrl: './actividades.component.html',
  styleUrl: './actividades.component.css'
})
export class ActividadesComponent implements OnInit {
  actividades: any[] = [];
  actividad: any = { nombre_actividad: '', description: '', fecha_entrega: '', estado_actividad: '' }; // Para crear y actualizar
  error: string = '';
  editMode: boolean = false;
  editingId: number | null = null;

  constructor(private actividadesService: ActividadesService) {}

  ngOnInit(): void {
    this.loadActividades();
  }

  loadActividades(): void {
    this.actividadesService.getActividades().subscribe({
      next: (data) => {
        this.actividades = data.data;
      },
      error: () => {
        this.error = 'Error al cargar las actividades';
      }
    });
  }

  createActividad(): void {
    this.actividadesService.createActividad(this.actividad).subscribe({
      next: () => {
        this.loadActividades();
        this.actividad = { nombre_actividad: '', description: '', fecha_entrega: '', estado_actividad: '' };
      },
      error: () => {
        this.error = 'Error al crear la actividad';
      }
    });
  }

  editActividad(actividad: any): void {
    this.editMode = true;
    this.editingId = actividad.id;
    this.actividad = { ...actividad };
  }

  updateActividad(): void {
    if (this.editingId !== null) {
      this.actividadesService.updateActividad(this.editingId, this.actividad).subscribe({
        next: () => {
          this.loadActividades();
          this.editMode = false;
          this.actividad = { nombre_actividad: '', description: '', fecha_entrega: '', estado_actividad: '' };
          this.editingId = null;
        },
        error: () => {
          this.error = 'Error al actualizar la actividad';
        }
      });
    }
  }

  deleteActividad(id: number): void {
    this.actividadesService.deleteActividad(id).subscribe({
      next: () => {
        this.loadActividades();
      },
      error: () => {
        this.error = 'Error al eliminar la actividad';
      }
    });
  }

}
