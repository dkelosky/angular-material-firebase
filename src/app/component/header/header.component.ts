import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToggleSideNavService } from 'src/app/service/toggle-side-nav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less', '../../app.component.less']
})
export class HeaderComponent implements OnInit {

  constructor(
    public afAuth: AngularFireAuth,
    private tgglSrvc: ToggleSideNavService,
  ) { }

  runToggle() {
    this.tgglSrvc.trigger();
  }

  ngOnInit() {
  }

}
