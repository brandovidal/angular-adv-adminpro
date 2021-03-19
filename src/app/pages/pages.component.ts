import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {
  linkTheme = document.querySelector('#theme')

  constructor() { }

  ngOnInit(): void {
    const url = localStorage.getItem('theme') || './assets/css/colors/default-dark.css'
    if (!url) { return; }
    this.linkTheme.setAttribute('href', url)
  }

}
