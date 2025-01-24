import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  horario: any = { materia: '', hora_inicio: '', hora_fin: '', dia: '',id_usuario:'' }; // Para crear y actualizar
  error: string = '';
  editMode: boolean = false;
  editingId: number | null = null;

  constructor(private router: Router,private horariosService: HorariosService) {}
  ngOnInit(): void {
    this.loadHorarios();
  }
  
  irPerfil() {
    // Redirigir al componente de registrar horario
    this.router.navigate(['/perfil']);
  }
  crearHorario() {
    // Redirigir al componente de registrar horario
    this.router.navigate(['/formulario-horario']);
  }

  loadHorarios(): void {
    this.horariosService.getHorarios().subscribe({
      next: (response) => {
        // Verifica si la respuesta es un arreglo
        if (Array.isArray(response)) {
          this.horarios = response; // Si es un arreglo directamente
        } else if (response.data && Array.isArray(response.data)) {
          // Filtra los horarios según el id_usuario almacenado en localStorage
          this.horarios = response.data.filter((horario: any) => horario.id_usuario == localStorage.getItem('id'));
        } else {
          console.error('La respuesta no contiene un arreglo válido:', response);
        }
      },
      error: (error) => {
        console.error('Error al cargar los horarios:', error);
        this.error = 'Error al cargar los horarios';
      }
    });
  }
  
  
  editHorario(horario: any): void {
    this.editMode = true;
    this.editingId = horario.id;
    this.horario = { ...horario };
  }

  updateHorario(horario: any): void {
    // Redirige al componente del formulario con el ID del horario seleccionado
    this.router.navigate([horario.id]);
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
