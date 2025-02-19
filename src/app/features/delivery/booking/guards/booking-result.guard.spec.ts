import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { bookingResultGuard } from './booking-result.guard';

describe('bookingResultGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => bookingResultGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
