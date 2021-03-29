import { Component, OnInit } from '@angular/core';
import { User } from 'models';
import { UserService } from 'services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
  user: User

  constructor(
    private userService: UserService,
  ) {
    this.user = userService.user
  }

  ngOnInit(): void {
  }

  logout() {
    this.userService.logout()
  }
}
