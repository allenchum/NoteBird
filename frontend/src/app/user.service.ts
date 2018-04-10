import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "./auth.service";
import 'rxjs/Rx';
import { User } from "./users/user.model";
import { environment } from "../environments/environment";


@Injectable()
export class UserService {

  constructor(private http: HttpClient,
              private authService: AuthService
              ) {

              }

  getUsers() {
    // For Authentication
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    let options = { headers: headers };
    return this.http.get(`${environment.apiServer}/api/users`, options).map((res: object[]) => {
      // do sth here
      return res.map((userJsonObj)=>new User(userJsonObj));
    });
  }
}
