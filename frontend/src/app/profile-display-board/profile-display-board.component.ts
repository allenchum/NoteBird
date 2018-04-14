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
  styleUrls: ['./profile-display-board.component.css']
})
export class ProfileDisplayBoardComponent implements OnInit {

  group = {
    name:"English",
    elements: ["ABC","DEF","GHI","JKL","CVB","UIO","dksh","djsakdas","sdjksada","dsajdgask"]
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

    // this code return an array of objects - notes with first image id
    // notes: format
    // if nth returned, return an empty array from BE
    // [ {
    //     id: 14,
    //     title: 'League of Leagends',
    //     description: null,
    //     created_at: 2018-04-14T03:35:10.270Z,
    //     updated_at: 2018-04-14T03:35:10.270Z,
    //     status: 'draft',
    //     userID: 1,
    //     coords_0: '50%',
    //     coords_1: '50%',
    //     dragging: false,
    //     image_Url: '/assets/img/AmumuSquare.png',
    //     style_top: '330px',
    //     style_left: '50%',
    //     style_height: '330px',
    //     style_width: '330px',
    //     style_border: 'none',
    //     noteID: 22,
    //     offs_0_: 0,
    //     offs_1_: 0 } ]
    //

  }

}
