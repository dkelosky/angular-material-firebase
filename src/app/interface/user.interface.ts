import { Entity } from './entity.interface';

export interface User extends Entity {
    token?: string;
    phone?: number;
}

export interface UserId extends User {
    id: string;
}
