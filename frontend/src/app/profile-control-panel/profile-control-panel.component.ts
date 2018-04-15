import { Component, OnInit } from "@angular/core";
import { Bookmark } from "../Bookmark";
import { UserInformService } from "../user-inform.service";

@Component({
  selector: "app-profile-control-panel",
  templateUrl: "./profile-control-panel.component.html",
  styleUrls: ["./profile-control-panel.component.css"]
})
export class ProfileControlPanelComponent implements OnInit {
  User: any;
  bookmarks: Bookmark[] = [];

  constructor(private userInformService: UserInformService) {}

  ngOnInit() {
    let english = new Bookmark("English");
    let animal = new Bookmark("Animal");
    this.bookmarks.push(english);
    this.bookmarks.push(animal);
    this.userInformService.getUserInfo().subscribe(res => {
      this.User = res[0];
      console.log(this.User);
    });
  }
}
