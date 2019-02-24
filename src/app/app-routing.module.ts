import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LmccHomeComponent } from './component/lmcc-home/lmcc-home.component';
import { HomeComponent } from './component/home/home.component';
import { AdminComponent } from './component/admin/admin.component';

const routes: Routes = [
  {
    path: 'in/lmcc',
    pathMatch: 'full',
    component: LmccHomeComponent,
  },
  {
    path: 'org/lmcc',
    pathMatch: 'full',
    component: AdminComponent,
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
