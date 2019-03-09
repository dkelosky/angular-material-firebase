import { Component, OnInit } from '@angular/core';
import { ContainerId } from 'src/app/interface/container.interface';
import { ContainersService } from 'src/app/service/containers.service';
import { OrganizationsService } from 'src/app/service/organizations.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AddContainerComponent } from '../add-container/add-container.component';
import { EditContainerComponent } from '../edit-container/edit-container.component';
import { OrganizationId } from 'src/app/interface/organization.interface';
import { UrlConstant } from 'src/app/constant/url.constant';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.less', '../../app.component.less']
})
export class OrganizationComponent implements OnInit {
  $containers: Observable<ContainerId[]>;

  containers: ContainerId[];
  organization: OrganizationId;

  error: string;

  constructor(
    private organizationsService: OrganizationsService,
    private containersService: ContainersService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
  ) {

    const organizationRoute = this.activatedRoute.snapshot.paramMap.get('organization');
    this.organizationsService.getOrganizationsWhere(organizationRoute).subscribe((orgs) => {

      if (orgs.length === 1) {

        this.organization = orgs[0];

        this.$containers = this.containersService.getContainers(orgs[0].id);

        this.$containers.subscribe((containers) => {

          this.containers = containers;

        });
      } else if (orgs.length > 1) {
        this.error = `Unexpected same named organization, total: ${orgs.length}`;
      } else {
        this.error = `'/${organizationRoute}' entry does not exist`;
      }
    });

  }

  ngOnInit() {
  }

  add() {
    this.openAddDialog();
  }

  edit(container: ContainerId) {
    this.openEditDialog(container);
  }

  openAddDialog() {
    this.dialog.open(AddContainerComponent, { data: this.organization });
  }

  openEditDialog(container: ContainerId) {
    this.dialog.open(EditContainerComponent, {
      data: {
        organization: this.organization,
        container
      }
    });
  }

  launch(container: ContainerId) {
    const url = `/${UrlConstant.URL_ORG_BASE}/${this.activatedRoute.snapshot.paramMap.get('organization')}/${container.uri}`;
    console.log(`Called to launch ${url}`);
    this.router.navigateByUrl(url);
  }

}
