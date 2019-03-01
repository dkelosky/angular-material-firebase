import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { OrganizationId, Organization } from '../interface/organization.interface';

@Injectable({
  providedIn: 'root'
})
export class OrganizationsService {

  constructor(
    private afs: AngularFirestore,
  ) { }

  getOrganizationsWhere(orgName: string) {
    console.log(`getting organizations`);
    return this.afs.collection<OrganizationId>('organizations/', ref => ref.where('name', '==', orgName))
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Organization;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }
}
