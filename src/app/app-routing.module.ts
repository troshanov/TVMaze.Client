import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowComponent } from './show/show/show.component';
import { ErrorComponent } from './error/error/error.component';
import { CastDetailsComponent } from './cast/cast-details/cast-details.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/show'
  },
  {
    path: 'show', 
    component: ShowComponent
  },
  {
    path: 'cast', 
    component: CastDetailsComponent
  },
  {
    path: 'error', 
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
