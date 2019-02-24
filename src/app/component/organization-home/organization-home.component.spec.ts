import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LmccHomeComponent } from "./LmccHomeComponent";

describe('LmccHomeComponent', () => {
  let component: LmccHomeComponent;
  let fixture: ComponentFixture<LmccHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LmccHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LmccHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
