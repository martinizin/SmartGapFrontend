import { Routes } from '@angular/router';
import { LoginComponent } from '../componentes/autenticacion/login/login.component';
import { HomeComponent } from '../componentes/home/home.component';
import { RegistroComponent } from '../componentes/autenticacion/registro/registro.component';
import { PerfilComponent } from '../componentes/perfil/perfil.component';
import { ActividadesComponent } from '../componentes/actividades/actividades.component';
import { CambiarContrasenaComponent } from '../componentes/autenticacion/cambiar-contrasena/cambiar-contrasena.component';
import { RecuperarContrasenaComponent } from '../componentes/autenticacion/recuperar-contrasena/recuperar-contrasena.component';
import { VerificarEmailComponent } from '../componentes/autenticacion/verificar-email/verificar-email.component';
import { HorariosComponent } from '../componentes/horarios/horarios.component';
import { FormularioActividadComponent } from '../componentes/formulario-actividad/formulario-actividad.component';
import { FormularioHorarioComponent } from '../componentes/formulario-horario/formulario-horario.component';
import { NotificacionRegistroComponent } from '../componentes/notificaciones/notificacion-registro/notificacion-registro.component';
import path from 'path';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full' },
    {path: 'home', component: HomeComponent },
    {path: 'login', component: LoginComponent },
    {path: 'registro', component: RegistroComponent},
    {path: 'notificacion-registro', component: NotificacionRegistroComponent},
    {path: 'perfil', component: PerfilComponent},
    {path: 'actividades', component: ActividadesComponent},
    {path: 'cambiar-contrasena', component: CambiarContrasenaComponent},
    {path: 'recuperar-contrasena', component: RecuperarContrasenaComponent},
    {path: 'verificar-email', component: VerificarEmailComponent},
    {path: 'horarios', component: HorariosComponent},
    {path: 'formulario-actividad', component: FormularioActividadComponent},
    {path: 'formulario-horario', component: FormularioHorarioComponent},
];
