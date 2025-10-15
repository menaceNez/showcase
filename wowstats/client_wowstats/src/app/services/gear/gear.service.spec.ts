import { TestBed } from '@angular/core/testing';

import { GearServiceService } from './gear-service.service';

describe('GearServiceService', () => {
  let service: GearServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GearServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
