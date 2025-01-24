import { Component,OnInit } from '@angular/core';
import { ActividadesService } from '../../servicios/actividades.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-actividades',
  imports: [FormsModule, CommonModule],
  templateUrl: './actividades.component.html',
  styleUrl: './actividades.component.css'
})
export class ActividadesComponent implements OnInit {
  actividades: any[] = [
  'Realizado',
  'Pendiente',
  ];
  actividad: any = {};
  editMode: boolean = false;
  editingId: number | null = null;
  nuevaActividad = {
    descripcion: '',
    fecha_entrega: '',
    id_usuario: 0,
    estado_actividad: '',
    nombre_actividad: ''
  };
  constructor(private router: Router, private actividadesService: ActividadesService) {}

  ngOnInit(): void {
    this.obtenerActividades();
  }
  editarActividad(id: number, actividad: any): void {
    // Copia los datos de la actividad seleccionada al modelo del formulario
    this.actividad = { ...actividad }; 
    this.editMode = true; // Cambia al modo edición
    this.editingId = id; // Guarda el ID de la actividad que se está editando
  }

  crearActivididad(): void {
    // Redirige a la ruta para crear una nueva actividad
    this.router.navigate(['formulario-actividad']);
  }

  obtenerActividades(): void {
    this.actividadesService.obtenerActividades().subscribe(
      (response) => {
        // Asegúrate de que 'response' sea un arreglo
        if (Array.isArray(response)) {
          this.actividades = response; // Si es un arreglo directamente
        } else if (response.data && Array.isArray(response.data)) {
          this.actividades = response.data.filter((actividad: any) => actividad.id_usuario == localStorage.getItem('id'));
          debugger
           // Si el arreglo está dentro de 'data'
        } else {
          console.error('La respuesta no contiene un arreglo válido:', response);
        }
      },
      (error) => {
        console.error('Error al obtener actividades:', error);
      }
    );
  }

  // Crear una nueva actividad
  agregarActividad(): void {
    // Convertir id_usuario a string antes de enviar
    const nuevaActividad = { ...this.nuevaActividad, id_usuario: this.nuevaActividad.id_usuario.toString() };
    this.actividadesService.crearActividad(nuevaActividad).subscribe(
      (response) => {
        console.log('Actividad registrada con éxito:', response);
        this.obtenerActividades(); // Refrescar lista de actividades
      },
      (error) => {
        console.error('Error al registrar actividad:', error);
      }
    );
  }
  irPerfil() {
    // Redirigir al componente de perfil
    this.router.navigate(['/perfil']);
  }
  

  // Actualizar una actividad
  // editarActividad(id: number, actividad: any): void {
  //   this.actividadesService.actualizarActividad(id, actividad).subscribe(
  //     (response) => {
  //       console.log('Actividad actualizada con éxito', response);
  //       this.obtenerActividades(); // Actualizar la lista
  //     },
  //     (error) => {
  //       console.error('Error al actualizar actividad', error);
  //     }
  //   );
  // }

  // Eliminar una actividad
  eliminarActividad(id: number): void {
    this.actividadesService.eliminarActividad(id).subscribe(
      (response) => {
        console.log('Actividad eliminada con éxito', response);
        this.obtenerActividades(); // Actualizar la lista
      },
      (error) => {
        console.error('Error al eliminar actividad', error);
      }
    );
  }
  resetFormulario(): void {
    this.actividad = {
      descripcion: '',
      fecha_entrega: '',
      id_usuario: '',
      estado_actividad: '',
      nombre_actividad: ''
    };
    this.editMode = false; // Sal del modo edición
    this.editingId = null; // Limpia el ID de edición
  }

  guardarActividad(): void {
    if (this.editMode) {
      // Actualizar la actividad existente
      if (this.editingId !== null) {
      this.actividadesService.actualizarActividad(this.editingId, this.actividad).subscribe({
        next: (response) => {
          console.log('Actividad actualizada con éxito:', response);
          this.obtenerActividades(); // Refresca la lista de actividades
          this.resetFormulario(); // Reinicia el formulario
        },
        error: (err) => {
          console.error('Error al actualizar la actividad:', err);
        }
      });
    } else {
      // Crear una nueva actividad
      this.actividadesService.crearActividad(this.actividad).subscribe({
        next: (response) => {
          console.log('Actividad creada con éxito:', response);
          this.obtenerActividades(); // Refresca la lista de actividades
          this.resetFormulario(); // Reinicia el formulario
        },
        error: (err) => {
          console.error('Error al crear la actividad:', err);
        }
      });
    };
  };
  
}
}
