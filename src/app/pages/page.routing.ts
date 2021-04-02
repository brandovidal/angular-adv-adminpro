import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminGuard, AuthGuard } from 'guards';

import { PagesComponent } from './pages.component';

// Main
import { AccountSettingsComponent, DashboardComponent, Grafica1Component, ProfileComponent, ProgressComponent, PromisesComponent, RxjsComponent, SearchComponent } from './main';

// Maintenance
import { UsersComponent, DoctorsComponent, DoctorComponent, HospitalsComponent } from './maintenance';


const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
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
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
