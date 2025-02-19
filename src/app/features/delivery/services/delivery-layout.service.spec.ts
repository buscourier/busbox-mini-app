import { TestBed } from '@angular/core/testing';

import { DeliveryLayoutService } from './delivery-layout.service';

describe('DeliveryLayoutService', () => {
  let service: DeliveryLayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryLayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
