import { Component, Input, OnInit } from '@angular/core';
import { User } from 'models';
import { ModalImagenService, UserService } from 'services';
import { FileUploadService } from 'services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {
  user: User

  public imgToUpload: File
  public imgTemporal: any
  acceptImg = 'image/png, image/jpeg, image/jng, image/gif'

  constructor(
    public userService: UserService,
    public modalImageService: ModalImagenService,
    public fileUploadService: FileUploadService,
  ) {
    this.user = userService.user
  }

  ngOnInit(): void {
  }

  closeModal() {
    this.imgTemporal = null
    this.modalImageService.closeModal()
  }

  changeFile(file: File) {
    this.imgToUpload = file

    if (!file) {
      return this.imgTemporal = null;
    }

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => this.imgTemporal = reader.result
  }

  uploadPhoto() {
    const { id, type } = this.modalImageService;
    console.info('modalImageService ', id, type)
    this.fileUploadService.updatePhoto(this.imgToUpload, type, id)
      .then(async (img) => {
        this.closeModal()
        this.modalImageService.newImg.emit(img)

        if (id === this.userService.uid) {
          this.user.img = img
        }
        await Swal.fire('Guardado', `Imagen de usuario actualizada`, 'success')

      }, async (err) => {
        console.warn(err.error.msg)
        await Swal.fire('Error', `${err.error.msg}`, 'error')
      })
  }
}
