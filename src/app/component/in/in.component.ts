import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input, ViewChild } from '@angular/core';
import { moveItemInArray, transferArrayItem, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { MediaMatcher } from '@angular/cdk/layout';
import { ToggleSideNavService } from 'src/app/service/toggle-side-nav.service';
import { MatSidenav, MatDialog, MatBottomSheet } from '@angular/material';
import { AddChildComponent } from '../add-child/add-child.component';
import { EditChildComponent } from '../edit-child/edit-child.component';
import { ChildrenService } from 'src/app/service/children.service';
import { OrganizationsService } from 'src/app/service/organizations.service';
import { ContainersService } from 'src/app/service/containers.service';
import { Observable, combineLatest } from 'rxjs';
import { ChildId } from 'src/app/interface/child.interface';
import { ContainerId } from 'src/app/interface/container.interface';
import { Confirm } from 'src/app/interface/confirm.interface';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { UsersService } from 'src/app/service/users.service';
import { ConfirmComponent } from '../confirm/confirm.component';
import { UserId } from 'src/app/interface/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';

interface CdkDLValuePair {
  values: ChildId[];
  cdkDL: CdkDropList;
  containers: ContainerId;
}

@Component({
  selector: 'app-in',
  templateUrl: './in.component.html',
  styleUrls: ['./in.component.less', '../../app.component.less']
})
export class InComponent implements OnInit, OnDestroy {

  private _mobileQueryListener: () => void;

  @ViewChild('snav') snav: MatSidenav;

  mobileQuery: MediaQueryList;
  cdkDLs: Map<string, CdkDLValuePair> = new Map<string, CdkDLValuePair>();

  $children: Observable<ChildId[]>;
  $containers: Observable<ContainerId[]>;

  children: ChildId[] = [];
  unallocatedChildren: ChildId[] = [];
  containers: ContainerId[] = [];

  user: UserId;

  justDenied = false;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public dialog: MatDialog,
    private toggleService: ToggleSideNavService,
    private childrenService: ChildrenService,
    private afMessaging: AngularFireMessaging,
    private u: UsersService,
    private bottomSheet: MatBottomSheet,
    public afAuth: AngularFireAuth,
    private organizationsService: OrganizationsService,
    private containersService: ContainersService,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.toggleService.toggle.subscribe(() => {
      this.snav.toggle();
    });

    this.u.getUser().subscribe((user) => {
      this.user = user;
      if (this.user.token) {

        // TODO(Kelosky): Test if you can get the browser prompt for existing user without getting bottom sheet prompt
        console.log(`This is an existing user which already as approved notifications, don't prompt again`);
        this.requestToken();
      } else {

        if (!this.justDenied) {
          console.log(`This is a new user, ask for web notifications`);
          this.initWebToken(`LMCC`);
        } else {
          console.log(`Not prompting user again, user was just created and denied web notifications`);
        }

      }
    });

    // TODO(Kelosky): make generic
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


        this.unallocatedChildren = combined.children.filter((child => child.in != null));
        this.children = combined.children.filter((child => child.in == null));

        this.containers = combined.containers;

        // TODO(Kelosky): BUGS.md here if we have the cdkDL we should get
        // values and update with unallocated children below on filter
      });
    });
  }

  allocate(cdkDL: CdkDropList, containers: ContainerId) {
    if (!this.cdkDLs.get(cdkDL.id)) {

      // TODO(Kelosky): error for children that are not allocated anywhere
      const values = this.unallocatedChildren.filter((child => containers.id.trim() === child.in.id.trim()));
      this.cdkDLs.set(cdkDL.id, {
        values,
        cdkDL,
        containers,
      });
    }
    return this.retrieve(cdkDL);
  }

  retrieve(cdkDL: CdkDropList) {
    if (this.cdkDLs.get(cdkDL.id)) {
      return this.cdkDLs.get(cdkDL.id).values;
    }
  }

  ngOnInit() {
  }

  add() {
    this.openAddDialog();
  }

  edit(child: ChildId) {
    this.openEditDialog(child);
  }

  openAddDialog() {
    this.dialog.open(AddChildComponent);
  }

  openEditDialog(child: ChildId) {
    this.dialog.open(EditChildComponent, { data: child });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  initWebToken(orgName: string) {

    const data: Confirm = {
      entity: { name: '' },
      message: `Do you want ${orgName} web notifications?`,
      affirm: 'Yes',
      deny: 'Cancel',
      affirmAction: () => {
        console.log('token user');
        // after logon, request a token and create an entry for user
        this.requestToken();

      },
      denyAction: () => {
        console.log('non token user');
        this.justDenied = true;
        this.u.setUser({
          name: this.afAuth.auth.currentUser.displayName,
        });
      },
    };
    this.bottomSheet.open(ConfirmComponent, {
      data,
    });
  }

  requestToken() {

    this.afMessaging.requestToken
      .subscribe(
        (token) => {
          this.u.setUser({
            name: this.afAuth.auth.currentUser.displayName,
            token
          });
        },
        (error) => {
          // TODO(Kelosky): warning - you will not receive any notifications
          console.error(error);
        },
      );
  }

  drop(event: CdkDragDrop<ChildId[]>, containers: ContainerId) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      // update DB
      if (containers) {
        event.previousContainer.data[event.previousIndex].in = this.containersService.getContainerRef(`lmcc`, containers);
        console.log(`${event.previousContainer.data[event.previousIndex].name} ` +
          `will be added to ${event.previousContainer.data[event.previousIndex].in.id}`);
        this.childrenService.setChild(event.previousContainer.data[event.previousIndex]);
      } else {
        console.log(`${event.previousContainer.data[event.previousIndex].name} ` +
        `will be removed from ${event.previousContainer.data[event.previousIndex].in.id}`);
        delete event.previousContainer.data[event.previousIndex].in;
        this.childrenService.setChild(event.previousContainer.data[event.previousIndex]);
      }

      // update UI
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
