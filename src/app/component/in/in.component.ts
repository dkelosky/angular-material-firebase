import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { moveItemInArray, transferArrayItem, CdkDragDrop } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-in',
  templateUrl: './in.component.html',
  styleUrls: ['./in.component.less', '../../app.component.less']
})
export class InComponent implements OnInit {
  todo = [
    'Daniel Kelosky',
    'Samuel Kelosky',
    'Abigail Kelosky',
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
  ) { }


  ngOnInit() {
  }

  add() {
    console.log('addd')
  }
}
