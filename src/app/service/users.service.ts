import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

export interface User {
  name: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
  ) { }

  setUser(token: string) {
    this.afs.doc<User>(`users/${this.afAuth.auth.currentUser.uid}`).set(
      {
        name: this.afAuth.auth.currentUser.displayName,
        token,
      }
    );
  }
}
