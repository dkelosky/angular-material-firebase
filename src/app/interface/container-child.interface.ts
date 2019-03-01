import { DocumentReference } from '@angular/fire/firestore';

export interface ContainerChild {
    ref: DocumentReference;
}

export interface ContainerChildId extends ContainerChild {
    id: string;
}
