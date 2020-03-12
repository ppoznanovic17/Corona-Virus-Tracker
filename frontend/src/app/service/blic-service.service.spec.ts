import { TestBed } from '@angular/core/testing';

import { BlicServiceService } from './blic-service.service';

describe('BlicServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BlicServiceService = TestBed.get(BlicServiceService);
    expect(service).toBeTruthy();
  });
});
