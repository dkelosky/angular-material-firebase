import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { moveItemInArray, transferArrayItem, CdkDragDrop } from '@angular/cdk/drag-drop';
import { MediaMatcher } from '@angular/cdk/layout';
import { ToggleSideNavService } from 'src/app/service/toggle-side-nav.service';
import { MatSidenav } from '@angular/material';
@Component({
  selector: 'app-in',
  templateUrl: './in.component.html',
  styleUrls: ['./in.component.less', '../../app.component.less']
})
export class InComponent implements OnInit, OnDestroy {
  private _mobileQueryListener: () => void;

  @ViewChild('snav') snav: MatSidenav;

  mobileQuery: MediaQueryList;
  todo = [
    'Daniel Kelosky',
    'Samuel Kelosky',
    'Abigail Kelosky',
    'Abigail Kelosky',
    // 'Abigail Kelosky',
    // 'Abigail Kelosky',
    // 'Abigail Kelosky',
    // 'Abigail Kelosky',
    // 'Abigail Kelosky',
    // 'Abigail Kelosky',
  ];

  done = [
  ];
  done2 = [
  ];
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
  constructor(
    public afAuth: AngularFireAuth,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private toggle: ToggleSideNavService,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.toggle.toggle.subscribe(() => {
      this.snav.toggle();
    });
  }


  ngOnInit() {
  }

  add() {
    console.log('addd');
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
