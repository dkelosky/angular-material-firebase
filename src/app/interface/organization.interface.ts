import { Entity } from './entity.interface';

export interface Organization extends Entity {
    description: string;
    ownerUid?: string;
}

export interface OrganizationId extends Organization {
    id: string;
}
