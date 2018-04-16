import { Component, OnInit } from '@angular/core';
import { Injectable } from "@angular/core";
import { element } from "protractor";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "../auth.service";
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { NotesService } from '../note.service'

@Component({
  selector: 'app-profile-display-board',
  templateUrl: './profile-display-board.component.html',
  styleUrls: ['./profile-display-board.component.css'],
})
export class ProfileDisplayBoardComponent implements OnInit {

  private term:string;
  private searchSelector:string = "title";

  group = {
    name:"English",
    elements: [{title:"ABC",author:"allen"},{title:"DEF",author:"allen"},{title:"HJK",author:"allen"},{title:"UIO",author:"allen"},{title:"OPL",author:"gordan"},{title:"NMB",author:"gordan"},{title:"QWE",author:"gordan"},{title:"BVC",author:"gordan"},{title:"QSA",author:"tommy"},{title:"TYE",author:"tommy"}]
  };

  notesObservable: Observable<any>
  notesNormal: any

  constructor(private http: HttpClient, private authService: AuthService, private notesService:NotesService) {

        }

  ngOnInit() {
    this.notesObservable = this.notesService.getNotes();

    this.notesService.getNotes().subscribe((notes)=>{
      this.notesNormal = notes;
      console.log("FE:", notes)
    });
  }
  
  searchByChange(args){
    let val = args.target.value;
    this.searchSelector = val;
  }
}
