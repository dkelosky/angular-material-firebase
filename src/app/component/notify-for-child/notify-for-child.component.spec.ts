import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifyForChildComponent } from './notify-for-child.component';

describe('NotifyForChildComponent', () => {
  let component: NotifyForChildComponent;
  let fixture: ComponentFixture<NotifyForChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifyForChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifyForChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
