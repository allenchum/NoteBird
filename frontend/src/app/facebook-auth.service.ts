import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { OAuthService } from 'angular2-oauth2/oauth-service';
import { environment } from '../environments/environment';

@Injectable()
export class FacebookAuthService {
    constructor(private router: Router, private oauthService: OAuthService){
          this.oauthService.loginUrl = "https://www.facebook.com/v2.11/dialog/oauth"
          this.oauthService.redirectUri = window.location.origin + "/auth/facebook/callback";
          this.oauthService.clientId = environment.facebookAppId;
          this.oauthService.scope = "email public_profile";
          this.oauthService.setStorage(localStorage);
    }

    logIn(){
        this.oauthService.initImplicitFlow();
    }
    logOut(){
        this.oauthService.logOut();
    }
}
