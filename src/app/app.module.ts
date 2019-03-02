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
  MatProgressBarModule,
  MatProgressSpinnerModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginMessageComponent } from './component/login-message/login-message.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
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
import { OrganizationHomeComponent } from './component/organization-home/organization-home.component';
import { ConfirmComponent } from './component/confirm/confirm.component';
import { OrganizationComponent } from './component/organization/organization.component';
import { ContainerComponent } from './component/container/container.component';
import { InHomeComponent } from './component/in-home/in-home.component';
import { SidenavHeaderComponent } from './component/sidenav-header/sidenav-header.component';
import { ContainerHomeComponent } from './component/container-home/container-home.component';
import { IndeterminateLoadingComponent } from './component/indeterminate-loading/indeterminate-loading.component';
import { FooterComponent } from './component/footer/footer.component';
import { AddContainerComponent } from './component/add-container/add-container.component';
import { EditContainerComponent } from './component/edit-container/edit-container.component';

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
    OrganizationHomeComponent,
    ConfirmComponent,
    OrganizationComponent,
    ContainerComponent,
    InHomeComponent,
    SidenavHeaderComponent,
    ContainerHomeComponent,
    IndeterminateLoadingComponent,
    FooterComponent,
    AddContainerComponent,
    EditContainerComponent
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
    MatProgressSpinnerModule,
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
  providers: [{
    provide: FirestoreSettingsToken, useValue: {}
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
