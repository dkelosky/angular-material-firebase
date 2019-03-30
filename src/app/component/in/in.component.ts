import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { moveItemInArray, transferArrayItem, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { MediaMatcher } from '@angular/cdk/layout';
import { ToggleService } from 'src/app/service/toggle.service';
import { MatSidenav, MatDialog, MatBottomSheet } from '@angular/material';
import { AddChildComponent } from '../add-child/add-child.component';
import { EditChildComponent } from '../edit-child/edit-child.component';
import { ChildrenService } from 'src/app/service/children.service';
import { OrganizationsService } from 'src/app/service/organizations.service';
import { ContainersService } from 'src/app/service/containers.service';
import { Observable, combineLatest, Subscription } from 'rxjs';
import { ChildId } from 'src/app/interface/child.interface';
import { ContainerId } from 'src/app/interface/container.interface';
import { Confirm } from 'src/app/interface/confirm.interface';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { UsersService } from 'src/app/service/users.service';
import { ConfirmComponent } from '../confirm/confirm.component';
import { UserId } from 'src/app/interface/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { MessagesService } from 'src/app/service/messages.service';

interface CdkDLValuePair {
  values: ChildId[];
  cdkDL: CdkDropList;
  container: ContainerId;
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

  children: ChildId[];
  unallocatedChildren: ChildId[];
  containers: ContainerId[];

  user: UserId;

  justDenied = false;
  error: string;

  toggle: Subscription;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public dialog: MatDialog,
    private toggleService: ToggleService,
    private childrenService: ChildrenService,
    private afMessaging: AngularFireMessaging,
    private u: UsersService,
    private bottomSheet: MatBottomSheet,
    public afAuth: AngularFireAuth,
    private organizationsService: OrganizationsService,
    private containersService: ContainersService,
    private activatedRoute: ActivatedRoute,
  ) {
    const organizationRoute = this.activatedRoute.snapshot.paramMap.get('organization');
    console.log(`Init for ${organizationRoute}`);

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.toggle = this.toggleService.toggle.subscribe(() => {
      this.snav.toggle();
    });

    this.u.getUser().subscribe((user) => {

      // if (this.user && this.user.id === user.id) {

      //   console.log(`User changed but it is the same user; do nothing`);

      // } else {

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
      // }
      console.log(`token: ${this.user.token}`);

    });

    // TODO(Kelosky): make generic
    this.organizationsService.getOrganizationsWhere(organizationRoute).subscribe((orgs) => {
      if (orgs.length === 1) {

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
      } else if (orgs.length > 1) {
        this.error = `Unexpected same named organization, total: ${orgs.length}`;
      } else {
        this.error = `'/${organizationRoute}' entry does not exist`;
      }
    });
  }

  allocate(cdkDL: CdkDropList, container: ContainerId) {
    if (!this.cdkDLs.get(cdkDL.id)) {

      // TODO(Kelosky): error for children that are not allocated anywhere
      const values = this.unallocatedChildren.filter((child => container.id.trim() === child.in.id.trim()));
      this.cdkDLs.set(cdkDL.id, {
        values,
        cdkDL,
        container,
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
    this.dialog.open(AddChildComponent, { data: this.user});
  }

  openEditDialog(child: ChildId) {
    this.dialog.open(EditChildComponent, { data: child });
  }

  ngOnDestroy(): void {
    this.toggle.unsubscribe();
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  initWebToken(orgName: string) {

    const confirm: Confirm = {
      entity: { name: '' },
      message: `Do you want ${orgName} web notifications?`,
      affirm: 'Yes',
      deny: 'Cancel',
      affirmAction: () => {
        console.log('User requested web notifications');
        this.requestToken();
      },
      denyAction: () => {
        console.log(`User chose to to deny web notifications`);
        this.justDenied = true;
        this.u.setUser({
          name: this.afAuth.auth.currentUser.displayName,
          phone: this.user.phone,
        });
      },
    };
    const bottomRef = this.bottomSheet.open(ConfirmComponent, {
      data: confirm,
    });

    bottomRef.afterDismissed().subscribe((data) => {
      console.log(`Web notification prompt dismissed with ${data}`);
      if (this.user.name) {
        // do nothing
        console.log(`User existed, doing nothing`);
      } else {
        console.log(`New user, assuming denied web notifications`);
        this.justDenied = true;
        this.u.setUser({
          name: this.afAuth.auth.currentUser.displayName,
          phone: this.user.phone,
        });
      }
    });
  }

  requestToken() {

    this.afMessaging.requestToken
      .subscribe(
        (token) => {
          this.u.setUser({
            name: this.afAuth.auth.currentUser.displayName,
            // phone: this.user.phone,
            token,
          });
        },
        (error) => {
          // TODO(Kelosky): warning - you will not receive any notifications
          console.error(error);
        },
      );
  }

  drop(event: CdkDragDrop<ChildId[]>, container: ContainerId) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      // update DB
      if (container) {
        event.previousContainer.data[event.previousIndex].in = this.containersService.getContainerRef(`lmcc`, container);
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
