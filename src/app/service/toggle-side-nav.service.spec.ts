import { TestBed } from '@angular/core/testing';

import { ToggleSideNavService } from './toggle-side-nav.service';

describe('ToggleSideNavService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToggleSideNavService = TestBed.get(ToggleSideNavService);
    expect(service).toBeTruthy();
  });
});
