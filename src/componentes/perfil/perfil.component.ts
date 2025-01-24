import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../servicios/login.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ActividadesService } from '../../servicios/actividades.service';
import { NotificacionesService } from '../../servicios/notificaciones.service';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'
@Component({
  selector: 'app-perfil',
  imports: [CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
  usuario: any = null;
  error: string = '';

  constructor(private loginService: LoginService, private router: Router,private actividadesService: ActividadesService,private notificacionesService:NotificacionesService) {}

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
    this.router.navigate(['/actividades']);
  }

 irNotificaciones() {
  
this.notificacionesService.obtenerNotificaciones().subscribe({
  next: (data) => {
    console.log('Notificaciones', data);
    let htmlContent = '';
    data.data.forEach((dat:any )=> {
    htmlContent += 
    `<div>
      <p>${dat.mensaje}</p>
      <hr/>
    </div>`
  ;
});
    Swal.fire({
      title: "Notificaciones",
      icon: "warning",
      html: htmlContent
      ,
      showCloseButton: true,
      showCancelButton: true,
    });
  },
  error: (error) => {
    console.error('Error al obtener las notificaciones', error);
    Swal.fire({
      title: 'Error',
      text: 'Hubo un problema al obtener las notificaciones',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }
});
}

  registrarHorario() {
    this.router.navigate(['/horarios']);
  }
  // actividadFiltrada() {
  //   this.actividadesService.obtenerActividadporId()
  // }	
  
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
