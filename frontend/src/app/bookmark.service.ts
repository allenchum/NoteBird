import { Injectable } from '@angular/core';
import { Bookmark } from "./Bookmark";
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { element } from "protractor";
import { environment } from "../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "./auth.service";
import 'rxjs/Rx';


@Injectable()
export class BookmarkService {
  BookmarkFormStyle:{ [s:string]: string };
  dropdownList = [];
  selectedNotes = [];
  dropdownSettings = {};
  notesList = [];

  constructor(private http: HttpClient, private authService: AuthService) { }

  addNewBookmark(){
  
  }

  showBookmarkForm(){
    if(this.BookmarkFormStyle['display']=='none'){
      this.BookmarkFormStyle= {
        'display':'block',
        'z-index':'99'
      }
    }else{
      this.BookmarkFormStyle = {
        'display':'none',
        'z-index':'-1'
      }
    }
    console.log(this.BookmarkFormStyle)
  }

  getNotesList(){
    //        //Authentication
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    let options = {headers:headers};
    return this.http.get(`${environment.apiServer}/api/noteAndPin/allUsers/allNotes`,options)
  }


}
