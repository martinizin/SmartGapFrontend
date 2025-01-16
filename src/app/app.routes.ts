import { Routes } from '@angular/router';
import { LoginComponent } from '../componentes/autenticacion/login/login.component';
import { RegistroComponent } from '../componentes/autenticacion/registro/registro.component';
export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent},
];
