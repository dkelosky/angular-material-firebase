import 'hammerjs';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatCardModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatIconModule,
  MatMenuModule,
  MatDialogModule,
  MatSnackBarModule,
  MatInputModule,
  MatBottomSheetModule,
  MatTableModule,
  MatDividerModule,
  MatExpansionModule,
  MatBadgeModule,
  MatTabsModule,
  MatSelectModule,
  MatRadioModule,
  MatProgressBarModule
} from '@angular/material';

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
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HeaderMenuComponent } from './component/header-menu/header-menu.component';
import { HeaderComponent } from './component/header/header.component';
import { AddChildComponent } from './component/add-child/add-child.component';
import { EditChildComponent } from './component/edit-child/edit-child.component';
import { LmccHomeComponent } from './component/lmcc-home/lmcc-home.component';
import { ConfirmComponent } from './component/confirm/confirm.component';

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
    AddChildComponent,
    EditChildComponent,
    LmccHomeComponent,
    ConfirmComponent
  ],
  imports: [
    FlexLayoutModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    DragDropModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatTableModule,
    MatDividerModule,
    MatSelectModule,
    MatRadioModule,
    MatExpansionModule,
    MatBadgeModule,
    MatListModule,
    MatCardModule,
    MatTabsModule,
    MatCheckboxModule,
    MatInputModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatBottomSheetModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatMenuModule,
    MatSnackBarModule,
    MatDialogModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireMessagingModule,
  ],
  entryComponents: [
    PrivacyPolicyComponent,
    TermsOfServiceComponent,
    AddChildComponent,
    EditChildComponent,
    ConfirmComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
