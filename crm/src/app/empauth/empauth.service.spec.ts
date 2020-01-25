import { TestBed } from '@angular/core/testing';

import { EmpauthService } from './empauth.service';

describe('EmpauthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmpauthService = TestBed.get(EmpauthService);
    expect(service).toBeTruthy();
  });
});
