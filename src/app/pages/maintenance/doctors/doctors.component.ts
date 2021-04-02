import { Component, OnDestroy, OnInit } from '@angular/core';
import { Doctor } from 'models';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ModalImagenService, SearchService } from 'services';
import { DoctorService } from 'services/doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: [
  ]
})
export class DoctorsComponent implements OnInit, OnDestroy {
  imgSubs: Subscription
  isLoading = true

  doctors: Doctor[] = []
  doctorsTemp: Doctor[] = []

  constructor(
    private doctorService: DoctorService,
    private searchService: SearchService,
    private modalImageService: ModalImagenService,
  ) { }

  ngOnInit(): void {
    this.getDoctors()
    this.uploadImg()
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  }

  uploadImg() {
    this.imgSubs = this.modalImageService.uploadImg
      .pipe(delay(200))
      .subscribe(() => this.getDoctors())
  }

  getDoctors() {
    this.isLoading = true

    this.doctorService.getDoctors()
      .subscribe(doctors => {
        console.info(doctors)
        this.isLoading = false
        this.doctors = doctors
        this.doctorsTemp = doctors
      })
  }

  search(term: string) {
    console.info(term)
    term = term.trim()
    if (!term) {
      return this.doctors = this.doctorsTemp
    }

    this.searchService.search('doctor', term)
      .subscribe((doctors: Doctor[]) => {
        console.info(doctors)
        this.doctors = doctors
      })
  }

  showImageModal(doctor: Doctor) {
    this.modalImageService.showModal('doctors', doctor.uid, doctor.img)
  }

  deleteDoctor(doctor: Doctor) {
    Swal.fire({
      title: 'Borrar doctor',
      text: `El doctor ${doctor.name} esta a punto de ser eliminado.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#ddd',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.doctorService.deleteDoctor(doctor.uid)
          .subscribe(() => {
            Swal.fire('Doctor borrado', `${doctor.name} eliminado`, 'success')
            this.getDoctors()
          })
      }
    })
  }
}
