import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { OrganizationHomeComponent } from './component/organization-home/organization-home.component';
import { InHomeComponent } from './component/in-home/in-home.component';
import { ContainerHomeComponent } from './component/container-home/container-home.component';
import { UrlConstant } from './constant/url.constant';

const routes: Routes = [
  {
    path: `${UrlConstant.URL_CHECK_BASE}/:organization`,
    component: InHomeComponent,
  },
  {
    path: `${UrlConstant.URL_ORG_BASE}/:organization`,
    component: OrganizationHomeComponent,
  },
  {
    path: `${UrlConstant.URL_ORG_BASE}/:organization/:container`,
    component: ContainerHomeComponent,
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
