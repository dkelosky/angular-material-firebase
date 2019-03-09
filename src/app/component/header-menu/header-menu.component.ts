import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlConstant } from '../../constant/url.constant';
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

  constructor(
    private afAuth: AngularFireAuth,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {

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
