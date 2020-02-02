import { TestBed } from '@angular/core/testing';

import { DetailedResponseService } from './detailed-response.service';

describe('DetailedResponseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DetailedResponseService = TestBed.get(DetailedResponseService);
    expect(service).toBeTruthy();
  });
});
