import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, Event, NavigationEnd, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-lmcc-home',
  templateUrl: './lmcc-home.component.html',
  styleUrls: ['./lmcc-home.component.less']
})
export class LmccHomeComponent implements OnInit {

  hidden;
  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
  ) {
    this.hidden = true;
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        console.log(`Navigation start ${event.url}`);
        if (event.url === '/') {
          this.hidden = false;
        } else {
          this.hidden = true;
        }
      }
      if (event instanceof NavigationEnd) {
        console.log(`Navigation end ${event.url}`);
      }
    });
  }


  ngOnInit() {
  }

}
