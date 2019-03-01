import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Container, ContainerId } from '../interface/container.interface';
import { ContainerChild } from '../interface/container-child.interface';

@Injectable({
  providedIn: 'root'
})
export class ContainersService {

  constructor(
    private afs: AngularFirestore,
  ) { }

  getContainers(orgId: string) {
    console.log(`organizations/${orgId}/containers/`);
    return this.afs.collection<ContainerId>(`organizations/${orgId}/containers/`)
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Container;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }

  getChildren(orgId: string, container: ContainerId) {
    console.log(`organizations/${orgId}/containers/`);
    return this.afs.collection<ContainerChild>(`organizations/${orgId}/container/${container.id}/children`)
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as ContainerChild;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }

  async addChild(orgId: string, container: ContainerId, child: DocumentReference) {
    console.log(`Adding to organizations/${orgId}/containers/${container.id}`);

    try {
      await this.afs.collection<ContainerChild>(`organizations/${orgId}/containers/${container.id}/children`).add({
        ref: child
      });
    } catch (err) {
      console.log(`addChild error`);
      console.error(err);
    }
  }

  async deleteChild(orgId: string, container: ContainerId, child: DocumentReference) {
    console.log(`Deleting from organizations/${orgId}/containers/${container.id}`);
    try {
      await this.afs.doc<ContainerChild>(`organizations/${orgId}/containers/${container.id}/children/${child.id}`).delete();
    } catch (err) {
      console.log('delete error');
      console.error(err);
    }
  }

  getContainerRef(orgId: string, container: ContainerId) {
    return this.afs.doc<Container>(`organizations/${orgId}/containers/${container.id}`).ref;
  }

}
