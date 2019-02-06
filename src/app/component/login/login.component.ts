import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import { Router } from '@angular/router';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { UsersService } from '../../service/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit, OnDestroy {

  private ui: firebaseui.auth.AuthUI;
  private url;

  constructor(
    public afAuth: AngularFireAuth,
    private afMessaging: AngularFireMessaging,
    private u: UsersService,
    private router: Router,
  ) {
    this.url = this.router.url;
  }

  ngOnInit() {
    this.ui = new firebaseui.auth.AuthUI(this.afAuth.auth);
    this.ui.start(
      '#firebaseui-auth-container',
      this.config
    );
  }

  async ngOnDestroy() {
    await this.ui.delete();
  }

  private get config(): firebaseui.auth.Config {
    // console.log(this.location.path() + " full")
    // console.log(this.url)
    return {
      callbacks: {
        signInSuccessWithAuthResult: (authResult, redirectUrl) => {

          // after logon, request a token and create an entry for user
          this.afMessaging.requestToken
            .subscribe(
              (token) => {
                // save token
                console.log(`Permission granted; saving token server: ${token}`);
                this.u.setUser(token); // NOTE(Kelosky): saves entire user - need to update just token
                // this.router.navigateByUrl('/in');
              },
              (error) => {
                // TODO(Kelosky): warning - you will not receive any notifications
                console.error(error);
              },
            );
          return true;
        }
      },
      // signInSuccessUrl: this.url + '/subscribe',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      ],
      // Terms of service url/callback.
      tosUrl: this.url + '/terms-of-service',
      // Privacy policy url/callback.
      privacyPolicyUrl: function () {
        window.location.assign(this.url + '/private-policy');
      }
    };
  }
}
