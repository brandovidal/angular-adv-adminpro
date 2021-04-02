import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'pipes/pipes.module';

import { UsersComponent } from './users/users.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { RouterModule } from '@angular/router';
import { DoctorComponent } from './doctor/doctor.component';

@NgModule({
  declarations: [UsersComponent, DoctorsComponent, DoctorComponent, HospitalsComponent],
  exports: [UsersComponent, DoctorsComponent, DoctorComponent, HospitalsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    PipesModule
  ]
})
export class MaintenanceModule { }
