import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { User } from 'models';
import { ModalImagenService, SearchService, UserService } from 'services';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit, OnDestroy {
  isLoading: boolean

  since = 0
  hasPrev: boolean = true
  hasNext: boolean = false

  countUsers = 0
  users: User[] = []
  usersTemp: User[] = []

  imgSubs: Subscription

  constructor(
    private userService: UserService,
    private searchService: SearchService,
    public modalImageService: ModalImagenService,
  ) { }

  ngOnInit(): void {
    this.getUsers()
    this.uploadImg()
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  }

  uploadImg() {
    this.imgSubs = this.modalImageService.uploadImg
      .pipe(delay(100))
      .subscribe(() => this.getUsers())
  }

  getUsers() {
    this.isLoading = true
    this.userService.getUsers(this.since)
      .subscribe(({ total, users }) => {
        console.info('users ', users, total)
        this.countUsers = total
        this.users = users
        this.usersTemp = users
        this.isLoading = false
      })
  }

  changePage(value: number) {
    this.since += value
    console.info('changePage ', value)

    if (this.since < 0) {
      this.since = 0
    } else if (this.since >= this.countUsers) {
      this.since -= value
    }
    this.hasPrev = this.since <= 0
    this.hasNext = this.since + value > this.countUsers
    this.getUsers()
  }

  changeRole(user: User) {
    console.info('changeRole ', user)
    this.userService.editUser(user)
      .subscribe(console.log, console.warn)
  }

  showImageModal(user: User) {
    this.modalImageService.showModal('users', user.uid, user.img)
  }

  search(term: string) {
    term = term.trim()
    if (!term) {
      return this.users = this.usersTemp
    }

    this.searchService.search('user', term)
      .subscribe((users: User[]) => {
        // console.info(users)
        this.users = users
      })
  }

  deleteUser(user: User) {
    if (user.uid === this.userService.uid) {
      return Swal.fire('Error', `No puede borrarse a si mismo`, 'error')
    }

    Swal.fire({
      title: 'Borrar usuario',
      text: `El usuario ${user.name} esta a punto de ser eliminado.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#ddd',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user)
          .subscribe(() => {
            Swal.fire('Usuario borrado', `${user.name} eliminado`, 'success')
            this.getUsers()
          })
      }
    })
  }
}
