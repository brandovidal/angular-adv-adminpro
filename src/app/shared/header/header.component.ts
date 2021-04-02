import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router,
  ) {
    this.user = userService.user
  }

  ngOnInit(): void {
  }

  search(term: string = '') {
    if (term.trim().length === 0) {
      return this.router.navigateByUrl('/');
    }

    console.info('search ', term)
    this.router.navigateByUrl(`/dashboard/search/${term}`)
  }

  logout() {
    this.userService.logout()
  }
}
