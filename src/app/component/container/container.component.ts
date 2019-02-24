import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContainerId } from 'src/app/interface/container.interface';
import { ContainersService } from 'src/app/service/containers.service';
import { OrganizationsService } from 'src/app/service/organizations.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.less', '../../app.component.less']
})
export class ContainerComponent implements OnInit {

  container: ContainerId;
  error: string;

  constructor(
    private route: ActivatedRoute,
    private organizationsService: OrganizationsService,
    private containersService: ContainersService,
  ) { }

  ngOnInit() {
    const containerRoute = this.route.snapshot.paramMap.get('container');
    console.log(`Init for ${containerRoute}`);

    // TODO(Kelosky): remove hard code
    this.organizationsService.getOrganizations('lmcc').subscribe((orgs) => {

      // TODO(Kelosky): handle multiple org responses
      this.containersService.getContainers(orgs[0].id).subscribe((containers) => {
        let match = false;
        containers.forEach((container) => {
          console.log(`Container ${container.name}`)
          if (container.name.toLowerCase() === containerRoute) {
            this.container = container;
            match = true;
          }
        });

        if (!match) {
          this.error = `${containerRoute} entry does not exist`;
          this.container = undefined;
        } else {
          this.error = undefined;
        }

      });
    });
  }

}
