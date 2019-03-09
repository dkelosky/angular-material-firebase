import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToggleService } from 'src/app/service/toggle.service';

@Component({
  selector: 'app-back-header',
  templateUrl: './back-header.component.html',
  styleUrls: ['./back-header.component.less', '../../app.component.less']
})
export class BackHeaderComponent implements OnInit {

  constructor(
    public afAuth: AngularFireAuth,
    private toggleService: ToggleService,
  ) { }

  ngOnInit() {
  }

  runToggle() {
    this.toggleService.trigger();
  }
}
