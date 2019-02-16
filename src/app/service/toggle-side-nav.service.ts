import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleSideNavService {

  public toggle: Subject<void>;
  constructor() {
    this.toggle = new Subject<void>();
  }

  trigger() {
    this.toggle.next();
  }
}
