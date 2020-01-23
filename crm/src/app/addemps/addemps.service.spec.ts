import { TestBed } from '@angular/core/testing';

import { AddempsService } from './addemps.service';

describe('AddempsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddempsService = TestBed.get(AddempsService);
    expect(service).toBeTruthy();
  });
});
