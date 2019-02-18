import { Entity } from './Entity.interface';

export interface Category extends Entity {
    description: string;
}

export interface CategoryId extends Category {
    id: string;
}
