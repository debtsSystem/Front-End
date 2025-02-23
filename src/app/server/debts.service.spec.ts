import { TestBed } from '@angular/core/testing';

import { DebtsServiceService } from './debts.service';

describe('DebtsServiceService', () => {
  let service: DebtsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DebtsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
