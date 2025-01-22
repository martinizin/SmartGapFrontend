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

  constructor(private registroService: RegistroService, private router: Router) {}

  onSubmit() {
    const usuario = {
      name: this.nombre,
      email: this.correo,
      password: this.contrasena,
      username:this.username,
      carrera: this.carrera,
      semestre: this.semestre
    };

    this.registroService.registrar(usuario).subscribe({
      next: (data) => {
        if (data && data.message) {
          this.router.navigate(['/login']);
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
}
