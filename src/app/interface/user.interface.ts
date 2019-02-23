import { Entity } from './entity.interface';

export interface User extends Entity {
    token?: string;
}

export interface UserId extends User {
    id: string;
}