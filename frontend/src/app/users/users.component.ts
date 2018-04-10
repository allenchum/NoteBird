import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { FilterService } from '../filter.service';
import { filter } from 'rxjs/operator/filter';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  usersObservable: Observable<Array<User>>
  usersNormal: Array<User>
  constructor(private userService: UserService,
              private filterService: FilterService) { }

  ngOnInit() {
    this.usersObservable = this.userService.getUsers();
    this.userService.getUsers().subscribe((users)=>{
      this.usersNormal = users;
    });
  }

  onFilter(searchTerm){
    // this.usersObservable = this.userService.getUsers()
    //       .map(users =>
    //         this.filterService.filter(users,"email",searchTerm)
    //       );
    // this.userService.getUsers().subscribe((users:Array<User>)=>{
    //   this.usersNormal = this.filterService.filter(users,"email",searchTerm)
    // });
  }
}
