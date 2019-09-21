import { TestBed, async, inject } from '@angular/core/testing';

import { PersonsGuard } from './persons.guard';

describe('PersonsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersonsGuard]
    });
  });

  it('should ...', inject([PersonsGuard], (guard: PersonsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
