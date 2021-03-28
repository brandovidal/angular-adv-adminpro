import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { AuthRoutingModule } from 'auth/auth.routing.';
import { PageRoutingModule } from 'pages/page.routing'

import { NotPageFoundComponent } from './not-page-found/not-page-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: NotPageFoundComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthRoutingModule,
    PageRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
