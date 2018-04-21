import { Component, OnInit } from "@angular/core";
import { Injectable } from "@angular/core";
import { element } from "protractor";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "../auth.service";
import "rxjs/Rx";
import { Observable } from "rxjs";
import { NotesService } from "../notes.service";
import { BookmarkService } from "../bookmark.service";

@Component({
  selector: "app-profile-display-board",
  templateUrl: "./profile-display-board.component.html",
  styleUrls: ["./profile-display-board.component.css"]
})
export class ProfileDisplayBoardComponent implements OnInit {
  private term: string;
  private searchSelector: string = "title";
  private Notes: any;
  private notesObservable: Observable<any>;
  private bookmarkID: number;
  private selectedBookmark: any;
  private selectedNotes: any;

  group = {
    name: "English",
    elements: [
      { title: "ABC", author: "allen" },
      { title: "DEF", author: "allen" },
      { title: "HJK", author: "allen" },
      { title: "UIO", author: "allen" },
      { title: "OPL", author: "gordan" },
      { title: "NMB", author: "gordan" },
      { title: "QWE", author: "gordan" },
      { title: "BVC", author: "gordan" },
      { title: "QSA", author: "tommy" },
      { title: "TYE", author: "tommy" }
    ]
  };

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private notesService: NotesService,
    private bookmarkService: BookmarkService
  ) {}

  ngOnInit() {
    //get Published Note
    this.bookmarkService.getNotesBySelector("published");
    
  }

  searchByChange(args) {
    let val = args.target.value;
    this.searchSelector = val;
  }


}
