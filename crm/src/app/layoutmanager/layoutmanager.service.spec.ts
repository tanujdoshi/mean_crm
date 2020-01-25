import { TestBed } from '@angular/core/testing';

import { LayoutmanagerService } from './layoutmanager.service';

describe('LayoutmanagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LayoutmanagerService = TestBed.get(LayoutmanagerService);
    expect(service).toBeTruthy();
  });
});
