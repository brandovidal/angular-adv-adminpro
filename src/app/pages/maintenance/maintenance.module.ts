import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { PipesModule } from 'pipes/pipes.module';

import { UsersComponent } from './users/users.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { HospitalsComponent } from './hospitals/hospitals.component';

@NgModule({
  declarations: [UsersComponent, DoctorsComponent, HospitalsComponent],
  exports: [UsersComponent],
  imports: [
    CommonModule,
    FormsModule,
    PipesModule
  ]
})
export class MaintenanceModule { }
