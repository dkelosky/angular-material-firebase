import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, Event, ActivatedRoute, NavigationEnd, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

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
