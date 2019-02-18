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

interface CdkDLValuePair {
  values: ChildId[];
  cdkDL: CdkDropList;
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

  children: ChildId[] = [];
  categories: Observable<CategoryId[]>; //

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
      this.categories = this.catsgrSrvc.getCategories(orgs[0].id);
    });


    this.chldrnSrvc.getChildren().subscribe((children) => {
      this.children = children;
    });
  }

  allocate(cdkDL: CdkDropList) {
    if (!this.cdkDLs.get(cdkDL.id)) {
      this.cdkDLs.set(cdkDL.id, {
        values: new Array(),
        cdkDL
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
    this.dialog.open(EditChildComponent, {data: child});
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
