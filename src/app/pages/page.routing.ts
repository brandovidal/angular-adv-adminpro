import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from 'guards';

import { PagesComponent } from './pages.component';

// Main
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { ProgressComponent } from './main/progress/progress.component';
import { Grafica1Component } from './main/grafica1/grafica1.component';
import { AccountSettingsComponent } from './main/account-settings/account-settings.component';
import { PromisesComponent } from './main/promises/promises.component';
import { RxjsComponent } from './main/rxjs/rxjs.component';
import { ProfileComponent } from './main/profile/profile.component';

// Maintenance
import { UsersComponent } from './maintenance/users/users.component';
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';


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

      // Maintenance
      { path: 'doctors', component: DoctorsComponent, data: { title: 'Doctores' } },
      { path: 'hospitals', component: HospitalsComponent, data: { title: 'Hospitales' } },
      { path: 'users', component: UsersComponent, data: { title: 'Usuarios de aplicacion' } },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
