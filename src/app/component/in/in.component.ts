import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input, ViewChild } from '@angular/core';
import { moveItemInArray, transferArrayItem, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { MediaMatcher } from '@angular/cdk/layout';
import { ToggleSideNavService } from 'src/app/service/toggle-side-nav.service';
import { MatSidenav, MatDialog } from '@angular/material';
import { AddChildComponent } from '../add-child/add-child.component';
import { EditChildComponent } from '../edit-child/edit-child.component';
import { ChildrenService } from 'src/app/service/children.service';
import { OrganizationsService } from 'src/app/service/organizations.service';
import { CategoriesService } from 'src/app/service/categories.service';
import { Observable, combineLatest } from 'rxjs';
import { ChildId } from 'src/app/interface/child.interface';
import { CategoryId } from 'src/app/interface/category.interface';
// import { combineLatest } from 'rxjs/operators';

interface CdkDLValuePair {
  values: ChildId[];
  cdkDL: CdkDropList;
  category: CategoryId;
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
  $categories: Observable<CategoryId[]>;
  children: ChildId[] = [];
  unallocatedChildren: ChildId[] = [];
  categories: CategoryId[] = [];

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public dialog: MatDialog,
    private toggleService: ToggleSideNavService,
    private childrenService: ChildrenService,
    private organizationsService: OrganizationsService,
    private categoriesService: CategoriesService,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.toggleService.toggle.subscribe(() => {
      this.snav.toggle();
    });

    // TODO(Kelosky): make generic
    this.organizationsService.getOrganizations('lmcc').subscribe((orgs) => {

      // get observables from database
      this.$categories = this.categoriesService.getCategories(orgs[0].id);
      this.$children = this.childrenService.getChildren();

      // combine to single subscribe (and provide custom mapping)
      combineLatest(this.$children, this.$categories, (children, categories) => {
        return {
          children,
          categories
        };
      }).subscribe((combined) => {

        this.unallocatedChildren = combined.children.filter((child => child.in != null));
        this.children = combined.children.filter((child => child.in == null));

        this.categories = combined.categories;
      });
    });
  }

  allocate(cdkDL: CdkDropList, category: CategoryId) {
    if (!this.cdkDLs.get(cdkDL.id)) {

      const values = this.unallocatedChildren.filter((child => category.id.trim() === child.in.id.trim()));
      this.cdkDLs.set(cdkDL.id, {
        values,
        cdkDL,
        category,
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

  drop(event: CdkDragDrop<ChildId[]>) {
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
