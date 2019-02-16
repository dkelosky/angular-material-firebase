import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LmccHomeComponent } from './component/lmcc-home/lmcc-home.component';
import { HomeComponent } from './component/home/home.component';

const routes: Routes = [
  {
    path: 'lmcc',
    pathMatch: 'full',
    component: LmccHomeComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
