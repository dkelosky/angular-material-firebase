import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input, ViewChild } from '@angular/core';
import { moveItemInArray, transferArrayItem, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
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
  // categories: CategoryId[]; //
  categories: Observable<CategoryId[]>; //

  done1 = [
  ];
  done2 = [
  ];

  lists: CdkDropList[] = [];

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
      // this.catsgrSrvc.getCategories(orgs[0].id).subscribe((categories) => {
        // this.categories = categories;
      // });
      this.categories = this.catsgrSrvc.getCategories(orgs[0].id); // .subscribe((categories) => {
      //  = categories;
      // });
    });


    this.chldrnSrvc.getChildren().subscribe((children) => {
      console.log(`got children`);
      this.children = children;
    });
  }

  addtest(test: CdkDropList, index: number) {
    let found = false;
    this.lists.forEach((entry) => {
      if (entry.id === test.id) {
        found = true;
      }
    });
    if (!found) {
      console.log(`adding ${test.id}`);
      this.lists.push(test);
    }
    return this.donetest(index);
  }

  donetest(index: number): any[] {
    console.log(`index ${index}`);
    if (index === 0) {
      console.log(`using 0`);
      return this.done1;
    } else {
      console.log(`using 1`);
      return this.done2;
    }
    // console.log(`how does this ${some}`);
    // console.log(test.id);
    // let found = false;
    // this.lists.forEach((entry) => {
    //   if (entry.id === test.id) {
    //     found = true;
    //   }
    // });

    // if (test) {

    // if (!found) {
    //   console.log(`adding ${test.id}`)
    //   this.lists.push(test);
    // }
    // }
    console.log(test.id)

    // if (test.id === `cdk-drop-list-1`) {
    // if (this.lists.length < 2) {
    // this.lists.push(test);
    // }
    return this.done1;
    // } else {
    //   // console.log('one');
    //   if (this.lists.length < 2) {
    //     this.lists.push(test);
    //   }
    //   return this.done2;
    // }
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

  getthem() {
    console.log(`current length is ${this.lists.length}`);
    return this.lists;
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
