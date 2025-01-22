import { Routes } from '@angular/router';
import { LoginComponent } from '../componentes/autenticacion/login/login.component';
import { RegistroComponent } from '../componentes/autenticacion/registro/registro.component';
import { PerfilComponent } from '../componentes/perfil/perfil.component';
import { ActividadesComponent } from '../componentes/actividades/actividades.component';
import { CambiarContrasenaComponent } from '../componentes/autenticacion/cambiar-contrasena/cambiar-contrasena.component';
import { RecuperarContrasenaComponent } from '../componentes/autenticacion/recuperar-contrasena/recuperar-contrasena.component';
import { VerificarEmailComponent } from '../componentes/autenticacion/verificar-email/verificar-email.component';
import { HomeComponent } from '../componentes/home/home.component';
import { HorariosComponent } from '../componentes/horarios/horarios.component';
import { FormularioActividadComponent } from '../componentes/formulario-actividad/formulario-actividad.component';
import { FormularioHorarioComponent } from '../componentes/formulario-horario/formulario-horario.component';
import { NotificacionesComponent } from '../componentes/notificaciones/notificaciones.component';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full' },
    {path: 'login', component: LoginComponent },
    {path: 'registro', component: RegistroComponent},
    {path: 'perfil', component: PerfilComponent},
    {path: 'actividades', component: ActividadesComponent},
    {path: 'cambiar-contrasena', component: CambiarContrasenaComponent},
    {path: 'recuperar-contrasena', component: RecuperarContrasenaComponent},
    {path: 'verificar-email', component: VerificarEmailComponent},
    {path: 'home', component: HomeComponent},
    {path: 'horarios', component: HorariosComponent},
    {path: 'formulario-actividad', component: FormularioActividadComponent},
    {path: 'formulario-horario', component: FormularioHorarioComponent},
    {path: 'notificaciones', component: NotificacionesComponent},

];
