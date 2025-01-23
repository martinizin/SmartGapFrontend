import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../servicios/login.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ActividadesService } from '../../servicios/actividades.service';
@Component({
  selector: 'app-perfil',
  imports: [CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
  usuario: any = null;
  error: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.obtenerPerfil();
  }

  obtenerPerfil() {
    this.loginService.getPerfil().subscribe({
      next: (data) => {
        this.usuario = data; // Asume que el backend devuelve la información del usuario
      },
      error: (err) => {
        this.error = 'Hubo un problema al cargar el perfil';
        console.error(err);
      }
    });
  }
  registrarActividad() {
    // Redirigir al componente de registrar actividad
    this.router.navigate(['/actividades']);
  }

  registrarHorario() {
    // Redirigir al componente de registrar horario
    this.router.navigate(['/horarios']);
  }
  cerrarSesion(): void {
    const token = localStorage.getItem('access_token'); // Recuperar el token del almacenamiento local

    if (token) {
      this.loginService.cerrarSesion(token).subscribe(
        (response) => {
          console.log('Sesión cerrada con éxito', response);
          localStorage.removeItem('access_token'); // Eliminar el token del almacenamiento local
          this.router.navigate(['/login']); // Redirigir al login
        },
        (error) => {
          console.error('Error al cerrar sesión', error);
        }
      );
    } else {
      console.error('Token no encontrado');
    }

}

}
