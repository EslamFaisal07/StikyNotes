import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userdataGuard } from './userdata.guard';

describe('userdataGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userdataGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
