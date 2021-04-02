import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { SharedModule } from 'shared/shared.module';
import { ComponentsModule } from 'components/components.module';

import { PagesComponent } from './pages.component';
import { MainModule } from './main/main.module';
import { MaintenanceModule } from './maintenance/maintenance.module';
@NgModule({
  declarations: [PagesComponent],
  exports: [PagesComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ComponentsModule,
    MainModule,
    MaintenanceModule
  ],
})
export class PagesModule { }
