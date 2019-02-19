import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { ChildId, Child } from '../interface/child.interface';

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

  async setChild(child: ChildId) {
    const id = child.id;
    delete child.id;
    try {
      console.log(`Updating child: ${child.name} with ${id}`);
      await this.afs.doc<Child>(`${this.getCollectionString()}${id}`).set(child);
    } catch (err) {
      console.log('set error');
      console.error(err);
    }
  }

  async deleteChild(child: ChildId) {
    try {
      console.log(`Delete child: ${child.name} with ${child.id}`);
      await this.afs.doc<Child>(`${this.getCollectionString()}${child.id}`).delete();
    } catch (err) {
      console.log('delete error');
      console.error(err);
    }
  }

  private getCollectionString() {
    return `users/${this.afAuth.auth.currentUser.uid}/children/`;
  }
}
