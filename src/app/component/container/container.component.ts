import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContainerId } from 'src/app/interface/container.interface';
import { ContainersService } from 'src/app/service/containers.service';
import { OrganizationsService } from 'src/app/service/organizations.service';
import { ChildId } from 'src/app/interface/child.interface';
import { ChildrenService } from 'src/app/service/children.service';
import { Observable, combineLatest } from 'rxjs';
import { ToggleService } from 'src/app/service/toggle.service';
import { OrganizationId } from 'src/app/interface/organization.interface';
import { UrlConstant } from 'src/app/constant/url.constant';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.less', '../../app.component.less']
})
export class ContainerComponent implements OnInit {
  children: ChildId[];

  organization: OrganizationId;

  container: ContainerId;
  error: string;

  $children: Observable<ChildId[]>;
  $containers: Observable<ContainerId[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private organizationsService: OrganizationsService,
    private containersService: ContainersService,
    private childrenService: ChildrenService,
    private toggleService: ToggleService,
    private router: Router
  ) {

  }

  ngOnInit() {
    const organizationRoute = this.activatedRoute.snapshot.paramMap.get('organization');
    const containerRoute = this.activatedRoute.snapshot.paramMap.get('container');
    console.log(`Init for ${organizationRoute}/${containerRoute}`);

    this.organizationsService.getOrganizationsWhere(organizationRoute).subscribe((orgs) => {

      if (orgs.length === 1) {
        this.organization = orgs[0];

        this.toggleService.toggle.subscribe(() => {

          if (this.organization) {
            const url = `/${UrlConstant.URL_ORG_BASE}/${organizationRoute}`;
            console.log(`navigating to ${url}`);
            this.router.navigateByUrl(url);
          }
        });

        // get observables from database
        this.$containers = this.containersService.getContainers(orgs[0].id);
        this.$children = this.childrenService.getChildren();

        // combine to single subscribe (and provide custom mapping)
        combineLatest(this.$children, this.$containers, (children, containers) => {
          return {
            children,
            containers
          };
        }).subscribe((combined) => {
          let match = false;

          combined.containers.forEach((container) => {
            console.log(`Container ${container.name}`);
            if (container.uri === containerRoute) {
              this.container = container;
              match = true;
            }
          });

          if (!match) {
            this.error = `'/${organizationRoute}/${containerRoute}' entry does not exist`;
            this.container = undefined;
          } else {
            this.children = combined.children.filter((child => child.in && child.in.id === this.container.id));
            this.error = undefined;
          }
        });
      } else if (orgs.length > 1) {
        this.error = `Unexpected same named organization, total: ${orgs.length}`;
      } else {
        this.error = `'/${organizationRoute}' entry does not exist`;
      }
    });
  }

}
