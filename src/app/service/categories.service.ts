import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Organization } from './organizations.service';

export interface Category {
  name: string;
  description: string;
  requirements: string;
}

export interface CategoryId extends Category {
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private afs: AngularFirestore,
  ) { }

  getCategories(orgId: string) {
    return this.afs.collection<CategoryId>(`organizations/${orgId}/categories`)
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Category;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }

}
