import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router, UrlTree } from '@angular/router';

import { authGuard } from './auth-guard';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: { createUrlTree: (c: any[]) => ({ url: c.join('/') } as unknown as UrlTree), navigate: jasmine.createSpy('navigate') } }
      ]
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('returns true when session email exists', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue('user@example.com');
    const result = executeGuard({} as any, {} as any);
    expect(result).toBeTrue();
  });

  it('returns UrlTree to login when no session email', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue(null);
    const result = executeGuard({} as any, {} as any);
    expect(result instanceof UrlTree || (result as any)?.url === 'login').toBeTrue();
  });
});
