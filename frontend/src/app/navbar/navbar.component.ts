import { Component, OnInit } from '@angular/core';
import { FacebookAuthService } from '../facebook-auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

// double check
import { User } from './user.model';
import { FilterService } from '../filter.service';
import { filter } from 'rxjs/operator/filter';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService:AuthService,
              private router:Router) { }

  ngOnInit() {
  }

  onLogout(){
    this.authService.logOut();
    this.router.navigate(['/'])
  }
}
