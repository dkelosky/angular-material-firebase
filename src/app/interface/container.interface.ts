import { Entity } from './Entity.interface';

export interface Container extends Entity {
    description: string;
}

export interface ContainerId extends Container {
    id: string;
}
