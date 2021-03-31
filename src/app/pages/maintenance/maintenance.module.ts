import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { UsersComponent } from './users/users.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [UsersComponent, DoctorsComponent, HospitalsComponent],
  exports: [UsersComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class MaintenanceModule { }
