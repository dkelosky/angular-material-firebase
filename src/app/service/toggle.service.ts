import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleService {

  public toggle: Subject<void>;

  constructor() {
    this.toggle = new Subject<void>();
  }

  trigger() {
    this.toggle.next();
  }
}
