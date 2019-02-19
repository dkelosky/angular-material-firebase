import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Category, CategoryId } from '../interface/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private afs: AngularFirestore,
  ) { }

  getCategories(orgId: string) {
    return this.afs.collection<Category>(`organizations/${orgId}/categories/`)
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Category;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }

  getCategoryRef(orgId: string, category: CategoryId) {
    return this.afs.doc<Category>(`organizations/${orgId}/categories/${category.id}`).ref;
  }

}
