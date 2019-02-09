import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.less']
})
export class HeaderMenuComponent implements OnInit {

  constructor(
    private afAuth: AngularFireAuth,
  ) { }

  ngOnInit() {
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}
