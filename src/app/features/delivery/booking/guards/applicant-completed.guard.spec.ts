import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { applicantCompletedGuard } from './applicant-completed.guard';

describe('applicantCompletedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => applicantCompletedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
