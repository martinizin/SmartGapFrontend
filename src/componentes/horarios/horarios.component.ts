import { Component,OnInit } from '@angular/core';
import { HorariosService } from '../../servicios/horarios.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-horarios',
  imports: [FormsModule, CommonModule],
  templateUrl: './horarios.component.html',
  styleUrl: './horarios.component.css'
})
export class HorariosComponent implements OnInit {
  horarios: any[] = [];
  horario: any = { materia: '', hora_inicio: '', hora_fin: '', dia: '' }; // Para crear y actualizar
  error: string = '';
  editMode: boolean = false;
  editingId: number | null = null;

  constructor(private horariosService: HorariosService) {}

  ngOnInit(): void {
    this.loadHorarios();
  }

  loadHorarios(): void {
    this.horariosService.getHorarios().subscribe({
      next: (data) => {
        this.horarios = data.data;
      },
      error: () => {
        this.error = 'Error al cargar los horarios';
      }
    });
  }

  createHorario(): void {
    this.horariosService.createHorario(this.horario).subscribe({
      next: () => {
        this.loadHorarios();
        this.horario = { materia: '', hora_inicio: '', hora_fin: '', dia: '' };
      },
      error: () => {
        this.error = 'Error al crear el horario';
      }
    });
  }

  editHorario(horario: any): void {
    this.editMode = true;
    this.editingId = horario.id;
    this.horario = { ...horario };
  }

  updateHorario(): void {
    if (this.editingId !== null) {
      this.horariosService.updateHorario(this.editingId, this.horario).subscribe({
        next: () => {
          this.loadHorarios();
          this.editMode = false;
          this.horario = { materia: '', hora_inicio: '', hora_fin: '', dia: '' };
          this.editingId = null;
        },
        error: () => {
          this.error = 'Error al actualizar el horario';
        }
      });
    }
  }

  deleteHorario(id: number): void {
    this.horariosService.deleteHorario(id).subscribe({
      next: () => {
        this.loadHorarios();
      },
      error: () => {
        this.error = 'Error al eliminar el horario';
      }
    });
  }

}
