import { TestBed } from '@angular/core/testing';

import { CallForPapersService } from './call-for-papers.service';

describe('CallForPapersService', () => {
  let service: CallForPapersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CallForPapersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
