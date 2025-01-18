import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../servicios/login.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  correo: string = '';
  contrasena: string = '';
  error: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  onSubmit() {
    this.loginService.login(this.correo, this.contrasena).subscribe({
      next: (data) => {
        // Guardar el token o información del usuario
        localStorage.setItem('access_token', data.token);  // Asumiendo que devuelves un token
        this.router.navigate(['/perfil']);
      },
      error: (err) => {
        this.error = 'Credenciales incorrectas';
      }
    });
  }

}
