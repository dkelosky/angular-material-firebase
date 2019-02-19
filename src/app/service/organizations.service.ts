import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

// NOTE(Kelosky): unused

export interface Organization {
  name: string;
  description: string;
  ownerUid?: string;
}

export interface OrganizationId extends Organization {
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrganizationsService {

  constructor(
    private afs: AngularFirestore,
  ) { }

  getOrganizations(orgName: string) {
    return this.afs.collection<OrganizationId>('organizations/', ref => ref.where('name', '==', orgName))
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Organization;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }

  // async addOrganization(organization: Organization) {
  //   organization.ownerUid = this.afAuth.auth.currentUser.uid;
  //   try {
  //     await this.afs.collection<Organization>(this.getCollectionString()).add(organization);
  //   } catch (err) {
  //     console.log(`addOrganization error`);
  //     console.error(err);
  //   }
  // }

  // private getCollectionString() {
  //   return `organizations`;
  // }
}
