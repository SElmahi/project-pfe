import { TestBed } from '@angular/core/testing';

import { PublicationIndexService } from './publication-index.service';

describe('PublicationIndexService', () => {
  let service: PublicationIndexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicationIndexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
