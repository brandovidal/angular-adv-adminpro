import { Injectable } from '@angular/core';
import { IMenuItem } from 'interfaces/menu.interface';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: IMenuItem[] = []

  getMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu')) || []
  }
}
