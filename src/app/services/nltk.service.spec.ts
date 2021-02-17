import { TestBed } from '@angular/core/testing';

import { NltkService } from './nltk.service';

describe('NltkService', () => {
  let service: NltkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NltkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
