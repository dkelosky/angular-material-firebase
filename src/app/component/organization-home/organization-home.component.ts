import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-organization-home',
  templateUrl: './organization-home.component.html',
  styleUrls: ['./organization-home.component.less']
})
export class OrganizationHomeComponent implements OnInit {

  constructor(
    public afAuth: AngularFireAuth,
  ) {
  }

  ngOnInit() {
  }

}
