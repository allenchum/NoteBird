import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { AuthService } from "./auth.service";

@Injectable()
export class UserInformService {

  userInfo: any ;

  constructor(private http:HttpClient,private authService: AuthService) { }

  getUserInfo(){
    let headers = new HttpHeaders({'Authorization':'Bearer ' + this.authService.token})
    let options = { headers: headers };
    return this.http.get(`${environment.apiServer}/api/getUserInfo`,options);
  }

}
