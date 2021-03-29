import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'models';
import { UserService } from 'services';
import { FileUploadService } from 'services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {
  public profileForm: FormGroup
  public user: User
  public imgToUpload: File
  public imgTemporal: any
  acceptImg = 'image/png, image/jpeg, image/jng, image/gif'

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private fileUploadService: FileUploadService,
  ) {
    this.user = userService.user
  }

  ngOnInit(): void {
    const { name, email } = this.user
    this.profileForm = this.fb.group({
      name: [name, Validators.required],
      email: [email, [Validators.required, Validators.email]]
    })
  }

  updateProfile() {
    if (this.profileForm.invalid) {
      return
    }

    this.userService.updateUser(this.profileForm.value)
      .subscribe(async () => {
        const { name, email } = this.profileForm.value
        this.user.name = name
        this.user.email = email
        await Swal.fire('Actualizar usuario', `Usuario <strong>${name}</strong> actualizado`, 'success')
      }, async (err) => {
        console.warn(err.error.msg)
        await Swal.fire('Actualizar usuario', `${err.error.msg}`, 'error')
      })
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
    this.fileUploadService.updatePhoto(this.imgToUpload, 'users', this.user.uid)
      .then(async img => {
        this.user.img = img
        await Swal.fire('Actualizar avatar', `Imagen actualizada`, 'success')
      }, async (err) => {
        console.warn(err.error.msg)
        await Swal.fire('Actualizar avatar', `${err.error.msg}`, 'error')
      })
  }
}
