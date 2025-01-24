import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HorariosService } from '../../servicios/horarios.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario-horario',
  imports: [FormsModule, CommonModule],
  templateUrl: './formulario-horario.component.html',
  styleUrl: './formulario-horario.component.css'
})

export class FormularioHorarioComponent {
  horarios: any[] = [];
  horario: any = { materia: '', hora_inicio: '', hora_fin: '', dia: '',id_usuario:'' }; // Para crear y actualizar
  error: string = '';
  editMode: boolean = false;
  editingId: number | null = null;
  constructor(private router: Router, private route: ActivatedRoute, private horariosService: HorariosService) {}

  ngOnInit(): void {
    // Capturar el ID del horario desde la URL
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.editMode = true;
        this.editingId = +id; // Convertir el ID a número
        this.cargarHorario(this.editingId); // Cargar los datos del horario
      }
    });
  }
  irHorario() {
    // Redirigir al componente de registrar horario
    this.router.navigate(['/horarios']);
  }
   // Cargar todos los horarios
   cargarHorario(id: number): void {
    this.horariosService.getHorarioById(id).subscribe({
      next: (data) => {
        this.horario = data; // Cargar los datos en el formulario
      },
      error: (err) => {
        console.error('Error al cargar horario:', err);
        this.error = 'No se pudo cargar el horario.';
      }
    });
  }
  // Guardar un nuevo horario (POST)
  guardarHorario(): void {
    if (this.editMode) {
      this.actualizarHorario(); // Llama a la función de actualizar si está en modo edición
    } else {
      this.horariosService.createHorario(this.horario).subscribe({
        next: (data) => {
          this.horarios.push(data); // Agregar el nuevo horario a la lista
          this.resetFormulario(); // Reiniciar el formulario
          this.error = ''; // Limpiar el error
        },
        error: (err) => {
          console.error('Error al guardar horario:', err);
          this.error = 'No se pudo guardar el horario.';
        }
      });
    }
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
        this.loadHorarios(); // Cargar los horarios nuevamente si es necesario
        this.horario = { materia: '', hora_inicio: '', hora_fin: '', dia: '' }; // Resetear el formulario
        this.error = ''; // Limpiar errores
        this.router.navigate(['/horarios']); // Redirigir a la URL 'horarios'
      },
      error: () => {
        this.error = 'Error al crear el horario'; // Mostrar mensaje de error
      }
    });
  }

  // Actualizar un horario existente (PUT)
  actualizarHorario(): void {
    if (this.editingId !== null) {
      this.horariosService.updateHorario(this.editingId, this.horario).subscribe({
        next: (data) => {
          // Actualizar el horario en la lista local
          const index = this.horarios.findIndex((h) => h.id === this.editingId);
          if (index !== -1) {
            this.horarios[index] = data; // Reemplazar con los datos actualizados
          }
          this.resetFormulario(); // Reiniciar el formulario
          this.error = ''; // Limpiar el error
        },
        error: (err) => {
          console.error('Error al actualizar horario:', err);
          this.error = 'No se pudo actualizar el horario.';
        }
      });
    }
  }

  // Establecer modo edición
  editarHorario(horario: any): void {
    this.editMode = true;
    this.editingId = horario.id; // Asignar el ID del horario que se edita
    this.horario = { ...horario }; // Clonar el objeto horario para editar
  }

  // Reiniciar el formulario
  resetFormulario(): void {
    this.horario = { materia: '', hora_inicio: '', hora_fin: '', dia: '', id_usuario: '' };
    this.editMode = false;
    this.editingId = null;
  }
}
