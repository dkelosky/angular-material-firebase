// import 'hammerjs';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatListModule, MatCardModule, MatFormFieldModule, MatCheckboxModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginMessageComponent } from './component/login-message/login-message.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireMessagingModule } from '@angular/fire/messaging';

import { FlexLayoutModule } from '@angular/flex-layout';

import { environment } from '../environments/environment';
import { InComponent } from './component/in/in.component';
import { TermsOfServiceComponent } from './component/terms-of-service/terms-of-service.component';
import { PrivacyPolicyComponent } from './component/privacy-policy/privacy-policy.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginMessageComponent,
    LoginComponent,
    HomeComponent,
    InComponent,
    TermsOfServiceComponent,
    PrivacyPolicyComponent
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
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireMessagingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
