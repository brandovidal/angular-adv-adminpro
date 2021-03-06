import { Component, OnInit } from '@angular/core';
import { User } from 'models';
import { SidebarService, UserService } from 'services';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  // menuItems: any[]
  user: User

  constructor(
    public sidebarService: SidebarService,
    private userService: UserService,
  ) {
    this.user = userService.user

  }

  ngOnInit(): void {
  }

}
