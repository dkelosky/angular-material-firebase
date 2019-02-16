import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TermsOfServiceComponent } from './component/terms-of-service/terms-of-service.component';
import { PrivacyPolicyComponent } from './component/privacy-policy/privacy-policy.component';

const routes: Routes = [
  {
    path: 'terms-of-service',
    pathMatch: 'full',
    component: TermsOfServiceComponent
  },
  {
    path: 'privacy-policy',
    pathMatch: 'full',
    component: PrivacyPolicyComponent
  },
  {
    path: 'add',
    pathMatch: 'full',
    component: PrivacyPolicyComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
