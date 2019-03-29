import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlConstant } from '../../constant/url.constant';
import { MessagesService } from 'src/app/service/messages.service';
@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.less']
})
export class HeaderMenuComponent implements OnInit {

  hidden = true;

  homeUrl: string;
  orgUrl: string;

  homeDisabled = true;
  dashboardDisabled = true;

  count: number;

  constructor(
    private afAuth: AngularFireAuth,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private messagesService: MessagesService,
  ) { }

  ngOnInit() {
    this.messagesService.count.subscribe((count) => {
      console.log(`messages services updates count: ${count}`);
      this.count = count;
    });

    // TODO(Kelosky): is subscribe really needed here?  cant we do this?
    // const organizationRoute = this.activatedRoute.snapshot.paramMap.get('organization');
    // const containerRoute = this.activatedRoute.snapshot.paramMap.get('container');
    this.activatedRoute.url.subscribe((urlValue) => {

      console.log(`url value is ${urlValue}, items are ${urlValue.length}`);

      if (urlValue.length > 0) {
        this.hidden = false;

        this.orgUrl = `${UrlConstant.URL_ORG_BASE}/${urlValue[1]}`;
        this.homeUrl = `${UrlConstant.URL_CHECK_BASE}/${urlValue[1]}`;

        if (urlValue[0].toString() === UrlConstant.URL_CHECK_BASE) {
          this.homeDisabled = true;
          this.dashboardDisabled = false;
        } else {
          this.homeDisabled = false;
          this.dashboardDisabled = true;
        }

      } else {
        this.hidden = true;
      }

    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  home() {
    console.log(`navigating to ${this.homeUrl}`);
    this.router.navigateByUrl(this.homeUrl);
  }

  dashboard() {
    console.log(`navigating to ${this.orgUrl}`);
    this.router.navigateByUrl(this.orgUrl);
  }

}
