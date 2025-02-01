import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { senderCompletedGuard } from './sender-completed.guard';

describe('senderCompletedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => senderCompletedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
