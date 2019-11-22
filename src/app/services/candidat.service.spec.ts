import { TestBed } from '@angular/core/testing';

import { CandidatService } from './candidat.service';

describe('CandidatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CandidatService = TestBed.get(CandidatService);
    expect(service).toBeTruthy();
  });
});
