import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../servicios/login.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-perfil',
  imports: [CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
  usuario: any = null;
  error: string = '';

  constructor(private loginService: LoginService) {}

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
    console.log('Registrando actividad...');
  }
  registrarHorario() {
    console.log('Registrando hora...');
  }
  cerrarSesion() {
    console.log('Cerrando sesión...');
  }

}
