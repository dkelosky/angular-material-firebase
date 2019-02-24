import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-in-home',
  templateUrl: './in-home.component.html',
  styleUrls: ['./in-home.component.less', '../../app.component.less']
})
export class InHomeComponent implements OnInit {

  constructor(
    public afAuth: AngularFireAuth,
  ) { }

  ngOnInit() {
  }

}
