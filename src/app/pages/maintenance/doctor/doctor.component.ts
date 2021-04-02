import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor, Hospital } from 'models';
import { delay } from 'rxjs/operators';
import { HospitalService, DoctorService } from 'services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: [
  ]
})
export class DoctorComponent implements OnInit {
  isLoading: boolean

  doctorForm: FormGroup
  doctorSelected: Doctor

  hospitals: Hospital[] = []
  hospitalSelected: Hospital

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private hospitalService: HospitalService,
  ) { }

  ngOnInit(): void {
    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required],
    })

    this.getDoctor()

    this.getHospitals()
    this.getHospitalSelected()
  }

  getDoctor() {
    this.activatedRoute.params.subscribe(({ id }) => {
      if (id === 'nuevo') {
        return
      }
      this.isLoading = true
      this.doctorService.getDoctorById(id)
        .pipe(delay(200))
        .subscribe(doctor => {
          console.info('getDoctor ', doctor)
          if (!doctor) {
            return this.router.navigateByUrl(`/dashboard/doctors`)
          }
          const { name, hospital: { _id: uid } } = doctor
          this.doctorForm.setValue({ name, hospital: uid })
          this.doctorSelected = doctor
          this.isLoading = false
        }, () => this.router.navigateByUrl(`/dashboard/doctors`))
    })
  }

  getHospitalSelected() {
    this.doctorForm.get('hospital').valueChanges
      .subscribe(hospitalId => this.hospitalSelected = this.hospitals.find(h => h.uid === hospitalId))
  }

  getHospitals() {
    this.hospitalService.getHospitals()
      .subscribe(hospitals => this.hospitals = hospitals)
  }

  saveDoctor() {
    if (this.doctorSelected) {
      this.updatedDoctor()
    } else {
      this.createDoctor()
    }
  }

  createDoctor() {
    this.doctorService.createDoctor(this.doctorForm.value)
      .subscribe(doctor => {
        Swal.fire('Medico creado', `${doctor.name} creado`, 'success')
        this.router.navigateByUrl(`/dashboard/doctor/${doctor.uid}`)
      })
  }

  updatedDoctor() {
    const doctor = {
      ...this.doctorForm.value,
      uid: this.doctorSelected.uid
    }
    this.doctorService.updateDoctor(doctor)
      .subscribe(doctor => {
        Swal.fire('Medico actualizado', `${doctor.name} actualizado`, 'success')
        this.router.navigateByUrl(`/dashboard/doctor/${doctor.uid}`)
      })
  }
}
