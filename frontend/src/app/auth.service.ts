import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment'

@Injectable()
export class AuthService {
    token: string = null;
    userID: string = null;

    constructor(private router: Router,private http:HttpClient){
        this.token = localStorage.getItem('myToken');
        this.userID = localStorage.getItem('userID');
    }

    facebookLogin(access_token){
        return this.http.post(`${environment.apiServer}/api/login/facebook`,{access_token:access_token}).subscribe((res:any)=>{
            this.token = res.token;
            this.userID = res.userID;
            localStorage.setItem('myToken',this.token);
            localStorage.setItem('userID',this.userID);
            this.router.navigate(['/create']);
        },(err)=>{
            alert("You are not logged in. Dude!");
        });
    }

    isAuthenticated(){
        return this.token != null;
        // consider adding, otherwise the app will be broken
        // return this.userID != null;
    }

    logOut(){
        this.token = null;
        this.userID = null;
        localStorage.removeItem('myToken');
        localStorage.removeItem('userID');

    }
}
