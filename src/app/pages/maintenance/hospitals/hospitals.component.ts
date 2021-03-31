import { Component, OnDestroy, OnInit } from '@angular/core';
import { Hospital } from 'models';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HospitalService, ModalImagenService, SearchService } from 'services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [
  ]
})
export class HospitalsComponent implements OnInit, OnDestroy {
  imgSubs: Subscription
  isLoading: boolean = true

  hospitalsTemp: Hospital[]
  hospitals: Hospital[]

  constructor(
    private hospitalService: HospitalService,
    private modalImageService: ModalImagenService,
    private searchService: SearchService,
  ) { }

  ngOnInit(): void {
    this.getHospitals()
    this.uploadImg()
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  }

  uploadImg() {
    this.imgSubs = this.modalImageService.uploadImg
      .pipe(delay(100))
      .subscribe(() => this.getHospitals())
  }

  getHospitals() {
    this.isLoading = true

    this.hospitalService.getHospitals()
      .subscribe(hospitals => {
        console.info(hospitals)
        this.isLoading = false
        this.hospitals = hospitals
        this.hospitalsTemp = hospitals
      })
  }

  createHospital(name: string) {
    this.hospitalService.createHospital(name)
      .subscribe(hospital => {
        console.info('hospital ', hospital)
        this.hospitals = [...this.hospitals, hospital]
        Swal.fire('Hospital creado', `${hospital.name} creado`, 'success')
      })
  }

  updateHospital(hospital: Hospital) {
    console.info('saveHospital ', hospital)
    this.hospitalService.updateHospital(hospital)
      .subscribe(({ name }) => Swal.fire('Hospital actualizado', `${name} actualizado`, 'success'))
  }

  deleteHospital(hospital: Hospital) {
    console.info('deleteHospital ', hospital)
    this.hospitalService.deleteHospital(hospital.uid)
      .subscribe(() => {
        this.getHospitals()
        Swal.fire('Hospital eliminado', `${hospital.name} eliminado`, 'success')
      })
  }

  async openModal() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear Hospital',
      inputLabel: 'Nombre de Hospital',
      input: 'text',
      inputPlaceholder: 'Hospital Central',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Agregar'
    })

    console.log('value ', value)
    if (value.trim().length === 0) {
      return
    }

    this.createHospital(value)
  }

  showImageModal(hospital: Hospital) {
    this.modalImageService.showModal('hospitals', hospital.uid, hospital.img)
  }

  search(term: string) {
    term = term.trim()
    if (!term) {
      return this.hospitals = this.hospitalsTemp
    }

    this.searchService.search('hospital', term)
      .subscribe((hospitals: Hospital[]) => {
        console.info(hospitals)
        this.hospitals = hospitals
      })
  }
}
