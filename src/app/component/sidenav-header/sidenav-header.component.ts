import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToggleSideNavService } from 'src/app/service/toggle-side-nav.service';

@Component({
  selector: 'app-sidenav-header',
  templateUrl: './sidenav-header.component.html',
  styleUrls: ['./sidenav-header.component.less', '../../app.component.less']
})
export class SidenavHeaderComponent implements OnInit {

  constructor(
    public afAuth: AngularFireAuth,
    private toggleService: ToggleSideNavService,
  ) { }

  runToggle() {
    this.toggleService.trigger();
  }

  ngOnInit() {
  }

}
