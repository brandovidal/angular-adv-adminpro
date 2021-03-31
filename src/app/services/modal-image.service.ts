import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'env/environment';

const baseUrl = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {
  private _hiddenModal = true
  public type: 'users' | 'doctors' | 'hospitals'
  public id: string
  public img: string = ''

  public newImg: EventEmitter<string> = new EventEmitter<string>()

  constructor() { }

  get hiddenModal() {
    return this._hiddenModal
  }

  showModal(
    type: 'users' | 'doctors' | 'hospitals',
    id: string,
    img: string = 'no-image'
  ) {
    this._hiddenModal = false
    this.type = type
    this.id = id

    if (!img) {
      img = `no-image`
    }

    this.img = img.includes('https') ? img : `${baseUrl}/api/upload/${type}/${img}`
    console.info('img ', this.img)
  }

  closeModal() {
    this._hiddenModal = true
  }
}
