import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

export interface Contact {
  name: string;
  phone: string;
}

export interface Child {
  name: string;
  age: number;
  gender: 'boy' | 'girl';
  important?: string;
  info?: string;
  contacts?: Contact[];
}

export interface ChildId extends Child {
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChildrenService {

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
  ) { }

  getChildren() {
    return this.afs.collection<ChildId>(this.getCollectionString()).snapshotChanges().pipe(
      map(actions => actions.map((a) => {
        const data = a.payload.doc.data() as Child;
        const id = a.payload.doc.id;
        return { id, ...data};
      }))
    );
  }

  async addChild(child: Child) {
    try {
      await this.afs.collection<Child>(this.getCollectionString()).add(child);
    } catch (err) {
      console.log(`addChild error`);
      console.error(err);
    }
  }

  async deleteChild(child: ChildId) {
    try {
      console.log(`Delete child: ${child.name} with ${child.id}`);
      await this.afs.collection<Child>(this.getCollectionString()).doc(child.id).delete();
    } catch (err) {
      console.log('deletTopic error');
      console.error(err);
    }
  }

  private getCollectionString() {
    return `users/${this.afAuth.auth.currentUser.uid}/children`;
  }
}
