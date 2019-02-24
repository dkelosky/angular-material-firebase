import { Component, OnInit } from '@angular/core';
import { ContainerId } from 'src/app/interface/container.interface';
import { ContainersService } from 'src/app/service/containers.service';
import { OrganizationsService } from 'src/app/service/organizations.service';
import { Observable, combineLatest } from 'rxjs';
import { ChildId } from 'src/app/interface/child.interface';
import { ChildrenService } from 'src/app/service/children.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.less', '../../app.component.less']
})
export class OrganizationComponent implements OnInit {
  $children: Observable<ChildId[]>;
  $containers: Observable<ContainerId[]>;

  containers: ContainerId[];
  children: ChildId[];

  constructor(
    private organizationsService: OrganizationsService,
    private containersService: ContainersService,
    private childrenService: ChildrenService,
  ) {
    this.organizationsService.getOrganizations('lmcc').subscribe((orgs) => {

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


        // get children that are in a container
        this.children = combined.children.filter((child => child.in != null));
        this.containers = combined.containers;

      });
    });
  }

  ngOnInit() {
  }

}
