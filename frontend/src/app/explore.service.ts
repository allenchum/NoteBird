import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Note } from './Note';
import { NotesService } from './notes.service';

@Injectable()
export class ExploreService {

  constructor(private http: HttpClient) { }

    /* GET notes whose title contains search term */
    searchNotes(term: string): Observable<Note[]> {
      if (!term.trim()) {
        // if not search term, return empty hero array.
        return of([]);
      }
      // return this.http.get<Note[]>(`api/notes/?title=${term}`).pipe(
      //   tap(_ => this.log(`found notes matching "${term}"`)),
      //   catchError(this.handleError<Note[]>('searchNotes', []))
      // );
    }

}
