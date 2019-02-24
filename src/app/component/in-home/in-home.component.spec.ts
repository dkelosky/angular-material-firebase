import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InHomeComponent } from './in-home.component';

describe('InHomeComponent', () => {
  let component: InHomeComponent;
  let fixture: ComponentFixture<InHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
