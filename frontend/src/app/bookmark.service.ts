import { Injectable } from "@angular/core";
import { Bookmark } from "./Bookmark";
import { SweetAlert2Module } from "@toverux/ngx-sweetalert2";
import { element } from "protractor";
import { environment } from "../environments/environment";
import { HttpClient, HttpHeaders, HttpErrorResponse} from "@angular/common/http";
import { AuthService } from "./auth.service";
import "rxjs/Rx";
import { observableToBeFn } from "rxjs/testing/TestScheduler";
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

@Injectable()
export class BookmarkService {
  BookmarkFormStyle: { [s: string]: string };
  notesList:any;

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
      `${environment.apiServer}/api/noteAndPin//userNote/published`,
      options
    );
  }

  postBookmark(bookmark:Bookmark){
    //Authentication
    let headers = new HttpHeaders({
      Authorization: "Bearer " + this.authService.token
    });
    let options = { headers: headers };
    return this.http.post<Bookmark>(
      `${environment.apiServer}/api/bookmark/create/`,bookmark,
      options
    ).subscribe();
  }
}
