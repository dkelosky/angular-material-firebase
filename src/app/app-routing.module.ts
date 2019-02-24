import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { OrganizationComponent } from './component/organization/organization.component';
import { ContainerComponent } from './component/container/container.component';
import { OrganizationHomeComponent } from './component/organization-home/organization-home.component';

const routes: Routes = [
  {
    path: 'in/:organization',
    component: OrganizationHomeComponent,
  },
  {
    path: 'org/:organization',
    component: OrganizationComponent,
  },
  {
    path: 'org/:organization/:container',
    component: ContainerComponent,
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
