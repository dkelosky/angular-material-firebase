// import 'hammerjs';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatListModule, MatCardModule, MatFormFieldModule, MatCheckboxModule, MatIconModule, MatMenuModule, MatDialogModule, MatProgressSpinnerModule, MatProgressBarModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginMessageComponent } from './component/login-message/login-message.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { FlexLayoutModule } from '@angular/flex-layout';

import { environment } from '../environments/environment';
import { InComponent } from './component/in/in.component';
import { TermsOfServiceComponent } from './component/terms-of-service/terms-of-service.component';
import { PrivacyPolicyComponent } from './component/privacy-policy/privacy-policy.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderMenuComponent } from './component/header-menu/header-menu.component';
import { HeaderComponent } from './component/header/header.component';
import { IndeterminateLoadingComponent } from './component/indeterminate-loading/indeterminate-loading.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginMessageComponent,
    LoginComponent,
    HomeComponent,
    InComponent,
    TermsOfServiceComponent,
    PrivacyPolicyComponent,
    HeaderMenuComponent,
    HeaderComponent,
    IndeterminateLoadingComponent
  ],
  imports: [
    FlexLayoutModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  entryComponents: [
    PrivacyPolicyComponent,
    TermsOfServiceComponent,
  ],
  providers: [{
    // suppress timestamp console message
    provide: FirestoreSettingsToken, useValue: {}
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
