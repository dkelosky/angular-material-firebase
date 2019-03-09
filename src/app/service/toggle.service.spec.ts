import { TestBed } from '@angular/core/testing';

import { ToggleService } from './toggle.service';

describe('ToggleSideNavService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToggleService = TestBed.get(ToggleService);
    expect(service).toBeTruthy();
  });
});
