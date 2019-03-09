import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { ChildId, Child } from '../interface/child.interface';
import { ContainerId } from '../interface/container.interface';

@Injectable({
  providedIn: 'root'
})
export class ChildrenService {

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
  ) { }

  // getChildrenWhere(containerRef: DocumentReference) {
  //   console.log(`Getting with container reference ${containerRef}`);
  //   return this.afs.collection<ChildId>(`${this.getCollectionString()}`, (ref) => {

  //     ref;

  //     return ref.where('in.id', '==', containerRef.id.trim())
  //   })
  //     .snapshotChanges().pipe(
  //       map(actions => actions.map(a => {
  //         const data = a.payload.doc.data() as Child;
  //         const id = a.payload.doc.id;
  //         return { id, ...data };
  //       }))
  //     );
  // }

  getChildren() {
    console.log(`getting children`);
    return this.afs.collection<ChildId>(this.getCollectionString()).snapshotChanges().pipe(
      map(actions => actions.map((a) => {
        const data = a.payload.doc.data() as Child;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  async addChild(child: Child) {
    console.log(`adding ${child.name}`);
    try {
      await this.afs.collection<Child>(this.getCollectionString()).add(child);
    } catch (err) {
      console.log(`addChild error`);
      console.error(err);
    }
  }

  // TODO(Kelosky): set certain fields
  async setChild(child: ChildId) {
    console.log(`Updating ${child.name}, id: ${child.id}`);
    const tempChild = Object.assign({}, child);
    delete tempChild.id;
    try {
      await this.afs.doc<Child>(`${this.getCollectionString()}${child.id}`).set(tempChild);
    } catch (err) {
      console.log('set error');
      console.error(err);
    }
  }

  async deleteChild(child: ChildId) {
    console.log(`Deleting ${child.name}, id: ${child.id}`);
    try {
      await this.afs.doc<Child>(`${this.getCollectionString()}${child.id}`).delete();
    } catch (err) {
      console.log('delete error');
      console.error(err);
    }
  }

  getChildRef(child: ChildId) {
    return this.afs.doc<Child>(`${this.getCollectionString()}${child.id}`).ref;
  }

  private getCollectionString() {
    return `users/${this.afAuth.auth.currentUser.uid}/children/`;
  }

}
