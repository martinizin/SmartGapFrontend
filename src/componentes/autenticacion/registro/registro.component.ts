import { Component } from '@angular/core';
import { RegistroService } from '../../../servicios/registro.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'registro-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  nombre: string = '';
  correo: string = '';
  username: string = '';
  contrasena: string = '';
  carrera: string = '';
  semestre: string = '';
  error: string = '';
  semestres: string[] = [
    'Primer Semestre',
    'Segundo Semestre',
    'Tercer Semestre',
    'Cuarto Semestre',
    'Quinto Semestre',
    'Sexto Semestre',
    'Séptimo Semestre',
    'Octavo Semestre',
    'Noveno Semestre',
  ];
  mostrarNotificacion: boolean = false;

  constructor(private registroService: RegistroService, private router: Router) {}

  onSubmit() {
    if (!this.validarFormulario()) {
      this.error = 'Por favor, corrige los errores antes de continuar.';
      return;
    }

    const usuario = {
      name: this.nombre,
      email: this.correo,
      password: this.contrasena,
      username: this.username,
      carrera: this.carrera,
      semestre: this.semestre
    };

    this.registroService.registrar(usuario).subscribe({
      next: (data) => {
        if (data && data.message) {
          this.mostrarNotificacion = true; // Muestra la notificación
          setTimeout(() => {
            this.mostrarNotificacion = false; // Oculta la notificación después de 2 segundos
            this.router.navigate(['/login']); // Redirige a la página de inicio de sesión
          }, 2000);
        } else {
          this.error = 'Error al registrar el usuario.';
        }
      },
      error: (err) => {
        this.error = 'Hubo un problema al registrar el usuario';
        console.error(err);
      }
    });
  }

  private validarFormulario(): boolean {
    const nombreValido = /^[a-zA-Z\s]+$/.test(this.nombre);
    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.correo);
    const contrasenaValida = /(?=.*[A-Z])(?=.*\d).+/.test(this.contrasena);
    const usernameValido = this.username.length <= 10;
    const carreraValida = /^[a-zA-Z\s]+$/.test(this.carrera);
    const semestreValido = this.semestres.includes(this.semestre);

    return (
      nombreValido &&
      correoValido &&
      contrasenaValida &&
      usernameValido &&
      carreraValida &&
      semestreValido
    );
  }
}
