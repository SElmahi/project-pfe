import { TestBed } from '@angular/core/testing';

import { CommitteesService } from './committees.service';

describe('CommitteesService', () => {
  let service: CommitteesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommitteesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
