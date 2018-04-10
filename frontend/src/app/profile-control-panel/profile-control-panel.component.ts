import { Component, OnInit } from '@angular/core';
import { Bookmark } from '../Bookmark';


@Component({
  selector: 'app-profile-control-panel',
  templateUrl: './profile-control-panel.component.html',
  styleUrls: ['./profile-control-panel.component.css']
})
export class ProfileControlPanelComponent implements OnInit {

  User = {
    "name":"User",
    "iconUrl":"/assets/img/AmumuSquare.png",
    "no_posts":"103",
    "no_fans":"245",
    "no_following":"356"
  }
  bookmarks: Bookmark[]=[];
  

    
  

  constructor() { }

  ngOnInit() {
    let english = new Bookmark("English");
    let animal = new Bookmark("Animal");
    this.bookmarks.push(english);
    this.bookmarks.push(animal);
  }

}
