import { TestBed } from '@angular/core/testing';

import { CharactertemplateService } from './charactertemplate.service';

describe('CharactertemplateService', () => {
  let service: CharactertemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharactertemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
