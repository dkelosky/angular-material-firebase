import { MatDialogRef } from '@angular/material';
import { Entity } from './entity.interface';

export interface Confirm {
    message?: string;
    entity: Entity;
    ref?: MatDialogRef<any>;
    affirm?: string;
    affirmAction?: () => void;
    deny?: string;
    denyAction?: () => void;
    successMessage?: string;
}
