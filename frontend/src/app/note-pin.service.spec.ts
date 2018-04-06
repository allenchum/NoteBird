import { TestBed, inject } from '@angular/core/testing';

import { NotePinService } from './note-pin.service';

describe('NotePinService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotePinService]
    });
  });

  it('should be created', inject([NotePinService], (service: NotePinService) => {
    expect(service).toBeTruthy();
  }));
});
