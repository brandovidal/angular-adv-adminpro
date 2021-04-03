import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Main
import { AccountSettingsComponent, DashboardComponent, Grafica1Component, ProfileComponent, ProgressComponent, PromisesComponent, RxjsComponent, SearchComponent } from './main';

// Maintenance
import { UsersComponent, DoctorsComponent, DoctorComponent, HospitalsComponent } from './maintenance';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'guards';

const childRoutes: Routes = [
  // Main
  { path: '', component: DashboardComponent, data: { title: 'Main' } },
  { path: 'progress', component: ProgressComponent, data: { title: 'Progress Bar' } },
  { path: 'grafica1', component: Grafica1Component, data: { title: 'Gráficas' } },
  { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Ajustes de Tema' } },
  { path: 'profile', component: ProfileComponent, data: { title: 'Perfil' } },
  { path: 'promises', component: PromisesComponent, data: { title: 'Promesas' } },
  { path: 'rxjs', component: RxjsComponent, data: { title: 'Rxjs' } },
  { path: 'search/:term', component: SearchComponent, data: { title: 'Busqueda' } },

  // Maintenance
  { path: 'doctors', component: DoctorsComponent, data: { title: 'Medicos' } },
  { path: 'doctor/:id', component: DoctorComponent, data: { title: 'Medicos' } },
  { path: 'hospitals', component: HospitalsComponent, data: { title: 'Hospitales' } },

  // Rutas Admin
  { path: 'users', canActivate: [AdminGuard], component: UsersComponent, data: { title: 'Usuarios de aplicacion' } },
]

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
