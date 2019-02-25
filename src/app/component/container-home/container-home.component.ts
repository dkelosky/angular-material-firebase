import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-container-home',
  templateUrl: './container-home.component.html',
  styleUrls: ['./container-home.component.less', '../../app.component.less']
})
export class ContainerHomeComponent implements OnInit {

  constructor(
    public afAuth: AngularFireAuth,
  ) { }

  ngOnInit() {
  }

}
