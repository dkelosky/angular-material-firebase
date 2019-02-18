import { Entity } from './entity.interface';

export interface Contact extends Entity {
    phone: string;
}

export interface Child extends Entity {
    age: number;
    gender: 'boy' | 'girl';
    important?: string;
    info?: string;
    contacts?: Contact[];
}

export interface ChildId extends Child {
    id: string;
}
