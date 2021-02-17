import { TestBed } from '@angular/core/testing';

import { GraphqlQueriesService } from './graphql-queries.service';

describe('GraphqlQueriesService', () => {
  let service: GraphqlQueriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphqlQueriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
