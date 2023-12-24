import { TestBed } from '@angular/core/testing';

import { AssignTestService } from './assign-test.service';

describe('AssignTestService', () => {
  let service: AssignTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
