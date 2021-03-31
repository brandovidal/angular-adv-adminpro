import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: [
  ]
})
export class PromisesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getUsuarios().then(users => console.log(users))
    // const promise = new Promise((resolve, reject) => {
    //   if (false) {
    //     resolve('Hi promise')
    //   } else {
    //     reject('Error')
    //   }
    // })
    // promise.then(message => console.log(message))
    //   .catch(error => console.info('Error in my promise ', error))
  }

  getUsuarios() {
    return new Promise(resolve => {
      fetch('https://reqres.in/api/users')
        .then(res => res.json())
        .then(body => resolve(body.data))
    })
  }
}
