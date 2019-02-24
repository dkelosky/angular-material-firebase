import { Entity } from './Entity.interface';
import { Routeable } from './routeable.interface';

export interface Container extends Entity, Routeable {
    description: string;
}

export interface ContainerId extends Container {
    id: string;
}
