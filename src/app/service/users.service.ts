import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { User, UserId } from '../interface/user.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
  ) { }

  // NOTE(Kelosky): note UserId because caller cannot influence the .id
  async setUser(user: User) {
    try {
      await this.afs.doc<User>(`users/${this.afAuth.auth.currentUser.uid}`).set(user);

    } catch (err) {
      console.log(`setUser error`);
      console.error(err);
    }
  }

  getUser() {
    return this.afs.doc<UserId>(`users/${this.afAuth.auth.currentUser.uid}`)
      .snapshotChanges().pipe(
        map(actions => {
          const data = actions.payload.data() as User;
          const id = actions.payload.id;
          return { id, ...data };
        })
      );
  }

}
