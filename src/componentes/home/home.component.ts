import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home', // Changed selector to a unique value
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router) {}

  navigateToLogin(): void {
    this.router.navigate(['login']);
  }

  navigateToRegister(): void {
    this.router.navigate(['registro']);
  }
  navigateToContact(): void {
    this.router.navigate(['contact']);
  }
  // Component logic
}