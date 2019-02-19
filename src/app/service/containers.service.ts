import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Container, ContainerId } from '../interface/container.interface';

@Injectable({
  providedIn: 'root'
})
export class ContainersService {

  constructor(
    private afs: AngularFirestore,
  ) { }

  getContainers(orgId: string) {
    return this.afs.collection<Container>(`organizations/${orgId}/categories/`)
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Container;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }

  getCategoryRef(orgId: string, container: ContainerId) {
    return this.afs.doc<Container>(`organizations/${orgId}/categories/${container.id}`).ref;
  }

}
