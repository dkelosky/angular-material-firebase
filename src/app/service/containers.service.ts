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
    console.log(`getting containers`);
    return this.afs.collection<Container>(`organizations/${orgId}/containers/`)
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Container;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }

  getContainerRef(orgId: string, container: ContainerId) {
    return this.afs.doc<Container>(`organizations/${orgId}/containers/${container.id}`).ref;
  }

}
