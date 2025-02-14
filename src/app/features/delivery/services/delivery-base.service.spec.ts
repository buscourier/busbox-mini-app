import { TestBed } from '@angular/core/testing';

import { DeliveryBaseService } from './delivery-base.service';

describe('DeliveryBaseService', () => {
  let service: DeliveryBaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryBaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
