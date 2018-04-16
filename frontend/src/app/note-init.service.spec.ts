import { TestBed, inject } from '@angular/core/testing';

import { NoteInitService } from './note-init.service';

describe('NoteInitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoteInitService]
    });
  });

  it('should be created', inject([NoteInitService], (service: NoteInitService) => {
    expect(service).toBeTruthy();
  }));
});
