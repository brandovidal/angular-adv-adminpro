import { Injectable } from '@angular/core';
import { IMenuItem } from 'interfaces/menu.interface';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: IMenuItem[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Main', url: '/' },
        { title: 'Gráficas', url: 'grafica1' },
        { title: 'ProgressBar', url: 'progress' },
        { title: 'Promesas', url: 'promises' },
        { title: 'Rxjs', url: 'rxjs' },
      ]
    },
    {
      title: 'Maintenance',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        { title: 'Medicos', url: 'doctors' },
        { title: 'Hospitals', url: 'hospitals' },
        { title: 'Users', url: 'users' },
      ]
    }
  ]

  constructor() { }
}
