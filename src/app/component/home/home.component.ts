import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less', '../../app.component.less']
})
export class HomeComponent implements OnInit {

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
  ) {
  }

  ngOnInit() {
  }

  lmcc() {
    this.router.navigateByUrl('/lmcc');
  }

}
