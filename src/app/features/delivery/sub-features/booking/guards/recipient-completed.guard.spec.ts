import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { recipientCompletedGuard } from '@features/delivery/booking/guards/recipient-completed.guard';

describe('recipientCompletedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => recipientCompletedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
