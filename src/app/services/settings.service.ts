import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private linkTheme = document.querySelector('#theme')
  private links: NodeListOf<Element>;

  constructor() {
    this.getTheme()
  }

  getTheme() {
    const url = localStorage.getItem('theme') || './assets/css/colors/default-dark.css'
    this.linkTheme.setAttribute('href', url)
  }

  changeTheme(theme: string) {
    const url = `./assets/css/colors/${theme}.css`
    this.linkTheme.setAttribute('href', url)
    localStorage.setItem('theme', url)
    this.checkCurrentTheme()
  }

  checkCurrentTheme() {
    this.links = document.querySelectorAll('.selector')
    this.links.forEach(link => {
      link.classList.remove('working')
      const btnTheme = link.getAttribute('data-theme')
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`
      const currentTheme = this.linkTheme.getAttribute('href')

      if(btnThemeUrl === currentTheme) {
        link.classList.add('working')
      }
    })
  }
}
