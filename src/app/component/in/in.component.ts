import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input, ViewChild } from '@angular/core';
import { moveItemInArray, transferArrayItem, CdkDragDrop } from '@angular/cdk/drag-drop';
import { MediaMatcher } from '@angular/cdk/layout';
import { ToggleSideNavService } from 'src/app/service/toggle-side-nav.service';
import { MatSidenav, MatDialog } from '@angular/material';
import { AddChildComponent } from '../add-child/add-child.component';
import { EditChildComponent } from '../edit-child/edit-child.component';
import { ChildrenService, ChildId } from 'src/app/service/children.service';
import { OrganizationsService } from 'src/app/service/organizations.service';
import { CategoriesService, CategoryId } from 'src/app/service/categories.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-in',
  templateUrl: './in.component.html',
  styleUrls: ['./in.component.less', '../../app.component.less']
})
export class InComponent implements OnInit, OnDestroy {

  private _mobileQueryListener: () => void;

  @ViewChild('snav') snav: MatSidenav;

  mobileQuery: MediaQueryList;

  // childrenListData: Observable<ChildId[]>; // = [{ name: 'daniel', age: 15, gender: 'boy' }];
  // childrenListData: Child[] = [{name: 'daniel', age: 15, gender: 'boy'}];

  children: ChildId[] = [];
  categories: CategoryId[]; //
  // categories: Observable<CategoryId[]>; //

  done = [
  ];
  done2 = [
  ];

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public dialog: MatDialog,
    private tgglSrvc: ToggleSideNavService,
    private chldrnSrvc: ChildrenService,
    private orgsSrvc: OrganizationsService,
    private catsgrSrvc: CategoriesService,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.tgglSrvc.toggle.subscribe(() => {
      this.snav.toggle();
    });

    this.orgsSrvc.getOrganizations('lmcc').subscribe((orgs) => {

      // NOTE(Kelosky): not accounting for multple lmcc orgs in the DB
      this.catsgrSrvc.getCategories(orgs[0].id).subscribe((categories) => {
        this.categories = categories;
      });
      // this.categories = this.catsgrSrvc.getCategories(orgs[0].id); // .subscribe((categories) => {
        //  = categories;
      // });
    });

    this.chldrnSrvc.getChildren().subscribe((children) => {
      console.log(`got children`);
      this.children = children;
    });
  }

  ngOnInit() {
  }

  add() {
    this.openAddDialog();
  }

  edit(item: string) {
    console.log(item);
    this.openEditDialog();
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddChildComponent);

    dialogRef.afterClosed().subscribe((result) => {
      // NOTE(Kelosky): if using MAT_DIALOG_DATA presumably
      // console.log(`Dialog result: ${result}`);
    });
  }

  openEditDialog() {
    const dialogRef = this.dialog.open(EditChildComponent);

    dialogRef.afterClosed().subscribe((result) => {
      // console.log(`Dialog result: ${result}`);
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
