import { Injectable } from "@angular/core";
import { Bookmark } from "./Bookmark";
import { SweetAlert2Module } from "@toverux/ngx-sweetalert2";
import { element } from "protractor";
import { environment } from "../environments/environment";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { AuthService } from "./auth.service";
import "rxjs/Rx";
import { observableToBeFn } from "rxjs/testing/TestScheduler";
import { Observable } from "rxjs";
import { NgForm } from "@angular/forms";

@Injectable()
export class BookmarkService {
  BookmarkFormStyle: { [s: string]: string };
  notesList: any;
  bookmarksList: any = [];
  selectedBookmark: Observable<any>;
  selectedBookmarkID: any;
  Notes:any;

  constructor(private http: HttpClient, private authService: AuthService) {}

  addNewBookmark() {}

  showBookmarkForm() {
    if (this.BookmarkFormStyle["display"] == "none") {
      this.BookmarkFormStyle = {
        display: "block",
        "z-index": "99"
      };
    } else {
      this.BookmarkFormStyle = {
        display: "none",
        "z-index": "-1"
      };
    }
    console.log(this.BookmarkFormStyle);
  }

  getNotesList() {
    //Authentication
    let headers = new HttpHeaders({
      Authorization: "Bearer " + this.authService.token
    });
    let options = { headers: headers };
    return this.http.get(
      `${environment.apiServer}/api/noteAndPin/userNote/published`,
      options
    );
  }

  getNotesBySelector(selector: any) {
    console.log(selector);
    if (selector === "published") {  //get published Note
      this.getPublishedNotes().subscribe(notes => {
        this.Notes = notes;
        console.log("Published Note:", notes);
      });
    } else if (selector === "draft") {   //get Draft Note
      this.getDraftNotes().subscribe(notes => {
        this.Notes = notes;
        console.log("Draft Note:", notes);
      });
    } else if (typeof selector === "number") {  //get Note by bookmarkID
      this.getNotesByBookmark(selector).subscribe(bookmark => {
        
        this.Notes = bookmark[0].notes;
        console.log("Bookmarked Note:", this.Notes);
      });
    }
  }

  postBookmark(bookmark: Bookmark) {
    //Authentication
    let headers = new HttpHeaders({
      Authorization: "Bearer " + this.authService.token
    });
    let options = { headers: headers };
    return this.http
      .post<Bookmark>(
        `${environment.apiServer}/api/bookmark/create/`,
        bookmark,
        options
      )
      .subscribe(res => console.log(res));
  }

  showBookmarksList() {
    //Authentication
    let headers = new HttpHeaders({
      Authorization: "Bearer " + this.authService.token
    });
    let options = { headers: headers };
    return this.http.get(
      `${environment.apiServer}/api/bookmark/show/`,
      options
    );
  }

  getNotesByBookmark(bookmarkID: number) {
    console.log("hi mum!!!!");
    // this.selectedBookmark = this.bookmarksList.filter(
    //   bookmark => bookmark.id == bookmarkID
    // )[0];
    // console.log("selected BM:", this.selectedBookmark);

    //Http get Notes from server
    //Authentication
    let headers = new HttpHeaders({
      Authorization: "Bearer " + this.authService.token
    });
    let options = { headers: headers };

    return this.http
      .get(
        `${environment.apiServer}/api/bookmark/user/bookmark/${bookmarkID}`,
        options
      )
  }

  getDraftNotes() {
    //Authentication
    let headers = new HttpHeaders({
      Authorization: "Bearer " + this.authService.token
    });
    let options = { headers: headers };
    return this.http.get(
      `${environment.apiServer}/api/bookmark/user/draft/`,
      options
    );
  }

  getPublishedNotes() {
    //Authentication
    let headers = new HttpHeaders({
      Authorization: "Bearer " + this.authService.token
    });
    let options = { headers: headers };
    return this.http.get(
      `${environment.apiServer}/api/bookmark/user/publish/`,
      options
    );
  }
}
