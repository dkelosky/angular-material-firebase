import { MatDialogRef } from '@angular/material';
import { Entity } from './Entity.interface';

export interface Confirm {
    message?: string;
    entity: Entity;
    ref?: MatDialogRef<any>;
    affirm?: string;
    deny?: string;
    successMessage?: string;
}
