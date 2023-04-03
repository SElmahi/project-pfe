import { TestBed } from '@angular/core/testing';

import { ImportantDatesService } from './important-dates.service';

describe('ImportantDatesService', () => {
  let service: ImportantDatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImportantDatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
