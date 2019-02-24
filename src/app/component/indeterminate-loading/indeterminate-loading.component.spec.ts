import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndeterminateLoadingComponent } from './indeterminate-loading.component';

describe('IndeterminateLoadingComponent', () => {
  let component: IndeterminateLoadingComponent;
  let fixture: ComponentFixture<IndeterminateLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndeterminateLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndeterminateLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
