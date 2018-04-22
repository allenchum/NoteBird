import { Component, OnInit } from "@angular/core";
import { Bookmark } from "../Bookmark";
import { UserInformService } from "../user-inform.service";
import { BookmarkService } from "../bookmark.service";
import  swal  from "sweetalert2";
import "rxjs/Rx";
import { Observable } from "rxjs";
import { NgForm } from "@angular/forms";


@Component({
  selector: "app-profile-control-panel",
  templateUrl: "./profile-control-panel.component.html",
  styleUrls: ["./profile-control-panel.component.css"]
})
export class ProfileControlPanelComponent implements OnInit {
  User: any;
  bookmarks:any =[];


  

  constructor(private userInformService: UserInformService, private bookmarkService: BookmarkService) {}

  ngOnInit() {

    this.userInformService.getUserInfo().subscribe(res => {
      this.User = res[0];
      console.log(this.User);
    });
    this.bookmarkService.BookmarkFormStyle = {
      'display':'none',
      'z-index':'-1'
    }

    //get update bookmarks list
    this.bookmarkService.showBookmarksList().subscribe(bookmarks=>{
      this.bookmarkService.bookmarksList = bookmarks;
      console.log("Existing bookmarks:",this.bookmarkService.bookmarksList);
    })
    //this.bookmarkService.updateBookmarkList();

  }
}
