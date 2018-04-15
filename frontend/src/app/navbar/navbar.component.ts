import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from '@angular/core';
import { FacebookAuthService } from '../facebook-auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { environment } from '../../environments/environment';
// double check
import { FilterService } from '../filter.service';
import { filter } from 'rxjs/operator/filter';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  token: string = null;
  userID: string = null;
  getuser: object;

  constructor(private http:HttpClient,
              private authService:AuthService,
              private router:Router) {
              this.userID = localStorage.getItem('userID');
              this.token = localStorage.getItem('myToken')
             }

  ngOnInit() {

  }

  isLoggedIn() {
    return this.token = null;
  }

  getUserInfo(){
    // For Authentication
    // let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    // let options = {headers:headers};
    // return this.http.post(`${environment.apiServer}/api/getUserInfo`, options).map((res:any)=>{
    //   return res.map(res);
    // });
  }

  onLogout(){
    this.authService.logOut();
    this.router.navigate(['/'])
  }
}
