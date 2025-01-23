import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home', // Changed selector to a unique value
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router) {}

  irLogin() {
    // Redirigir al componente de registrar actividad
    this.router.navigate(['/login']);
  }

  irRegistro() {
    // Redirigir al componente de registrar horario
    this.router.navigate(['/registro']);
  }
  // Component logic
}