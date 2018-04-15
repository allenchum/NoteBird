import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../environments/environment';

@Injectable()
export class UserInformService {

  constructor(private http:HttpClient) { }

  getUserIcon(){
    this.http.get(`${environment.apiServer}/api/noteAndPin/userNote`)

  }

}
