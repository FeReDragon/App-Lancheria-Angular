import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { guardarotaGuardGuard } from './guardarota-guard.guard';

describe('guardarotaGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => guardarotaGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
