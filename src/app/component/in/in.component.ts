import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-in',
  templateUrl: './in.component.html',
  styleUrls: ['./in.component.less']
})
export class InComponent implements OnInit {

  constructor(
    private router: Router,
    public afAuth: AngularFireAuth,
  ) { }

  ngOnInit() {
  }

  logout() {
    this.router.navigateByUrl('/');
    this.afAuth.auth.signOut();
  }

}
