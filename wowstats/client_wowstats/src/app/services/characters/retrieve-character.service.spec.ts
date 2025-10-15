import { TestBed } from '@angular/core/testing';

import { RetrieveCharacterService } from './retrieve-character.service';

describe('RetrieveCharacterService', () => {
  let service: RetrieveCharacterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetrieveCharacterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
