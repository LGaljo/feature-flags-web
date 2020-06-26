import { TestBed } from '@angular/core/testing';

import { EndUsersService } from './end-users.service';

describe('EndUsersService', () => {
  let service: EndUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EndUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
