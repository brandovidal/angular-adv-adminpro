import { SearchService } from './../../../services/search.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor, Hospital, User } from 'models';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {
  users: User[] = []
  doctors: Doctor[] = []
  hospitals: Hospital[] = []

  constructor(
    private activatedRoute: ActivatedRoute,
    private searchService: SearchService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(({ term }) => this.search(term))
  }

  search(term: string) {
    this.searchService.search(term)
      .subscribe((res: any) => {
        this.users = res.users
        this.doctors = res.doctors
        this.hospitals = res.hospitals
      })
  }

  showDoctor(id: string) {
    this.router.navigateByUrl(`/dashboard/doctor/${id}`)
  }
}
