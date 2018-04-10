import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { environment} from '../environments/environment'

@Injectable()
export class AuthService {
    token: string = null;

    constructor(private router: Router,private http:HttpClient){
        this.token = localStorage.getItem('myToken');
    }

    facebookLogin(access_token){
        return this.http.post(`${environment.apiServer}/api/login/facebook`,{access_token:access_token}).subscribe((res:any)=>{
            this.token = res.token;
            localStorage.setItem('myToken',this.token);
            this.router.navigate(['/create']);
        },(err)=>{
            alert("You are not logged in. Dude!");
        });
    }

    isAuthenticated(){
        return this.token != null;
    }

    logOut(){
        this.token = null;
        localStorage.removeItem('myToken');
    }
}
