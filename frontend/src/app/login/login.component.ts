import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FacebookAuthService } from '../facebook-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService,private router:Router,private facebookAuthService:FacebookAuthService) { }

  ngOnInit() {
    if(this.authService.isAuthenticated()){
      this.router.navigate(['create']);
    }
  }

  // onSubmit(formData){
  //   this.authService.logIn(formData.email,formData.password);
  // }

  onLoginWithFacebook(event){
    this.facebookAuthService.logIn();
  }
}
