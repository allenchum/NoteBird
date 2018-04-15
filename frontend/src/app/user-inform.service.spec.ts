import { TestBed, inject } from '@angular/core/testing';

import { UserInformService } from './user-inform.service';

describe('UserInformService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserInformService]
    });
  });

  it('should be created', inject([UserInformService], (service: UserInformService) => {
    expect(service).toBeTruthy();
  }));
});
