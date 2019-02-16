import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TermsOfServiceComponent } from './component/terms-of-service/terms-of-service.component';
import { PrivacyPolicyComponent } from './component/privacy-policy/privacy-policy.component';

const routes: Routes = [
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
