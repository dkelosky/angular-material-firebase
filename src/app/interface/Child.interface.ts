import { Entity } from './entity.interface';
import { DocumentReference } from '@angular/fire/firestore';

export interface Contact extends Entity {
    phone: string;
}

export interface Child extends Entity {
    age: number;
    gender: 'boy' | 'girl';
    important?: string;
    info?: string;
    in?: DocumentReference;
    contacts?: Contact[];
}

export interface ChildId extends Child {
    id: string;
}
