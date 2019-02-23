import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import { MatDialog } from '@angular/material';
import { PrivacyPolicyComponent } from '../privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from '../terms-of-service/terms-of-service.component';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less', '../../app.component.less']
})
export class LoginComponent implements OnInit, OnDestroy {

  private ui: firebaseui.auth.AuthUI;
  uiShown = false;

  constructor(
    public afAuth: AngularFireAuth,

    public dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    // this.url = this.router.serializeUrl;
    // console.log(`this ${this.url.}`)
    this.ui = new firebaseui.auth.AuthUI(this.afAuth.auth);
    this.ui.start(
      '#firebaseui-auth-container',
      this.config
    );
  }

  openPrivacyDialog() {
    const dialogRef = this.dialog.open(PrivacyPolicyComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openTocDialog() {
    const dialogRef = this.dialog.open(TermsOfServiceComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  async ngOnDestroy() {
    await this.ui.delete();
  }

  private get config(): firebaseui.auth.Config {
    return {
      callbacks: {
        signInSuccessWithAuthResult: (authResult, redirectUrl) => {
          // // after logon, request a token and create an entry for user
          // this.afMessaging.requestToken
          //   .subscribe(
          //     (token) => {

          //       // NOTE(Kelosky): saves entire user - need to update just token
          //       this.u.setUser({
          //         name: this.afAuth.auth.currentUser.uid,
          //         token
          //       });
          //     },
          //     (error) => {
          //       // TODO(Kelosky): warning - you will not receive any notifications
          //       console.error(error);
          //     },
          //   );
          return true;
        },
        uiShown: () => {
          this.uiShown = true;
        }
      },

      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      ],
      // Terms of service url/callback.
      tosUrl: () => {
        this.openTocDialog();
      },
      privacyPolicyUrl: () => {
        this.openPrivacyDialog();
      }
    };
  }
}
