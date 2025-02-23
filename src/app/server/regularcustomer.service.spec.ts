import { TestBed } from '@angular/core/testing';

import { RegularcustomerServiceService } from './regularcustomer.service';

describe('RegularcustomerServiceService', () => {
  let service: RegularcustomerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegularcustomerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
