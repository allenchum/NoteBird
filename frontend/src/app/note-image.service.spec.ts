import { TestBed, inject } from '@angular/core/testing';

import { NoteImageService } from './note-image.service';

describe('NoteImageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoteImageService]
    });
  });

  it('should be created', inject([NoteImageService], (service: NoteImageService) => {
    expect(service).toBeTruthy();
  }));
});
