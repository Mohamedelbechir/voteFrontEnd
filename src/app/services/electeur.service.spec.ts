import { TestBed } from '@angular/core/testing';

import { ElecteurService } from './electeur.service';

describe('ElecteurService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ElecteurService = TestBed.get(ElecteurService);
    expect(service).toBeTruthy();
  });
});
