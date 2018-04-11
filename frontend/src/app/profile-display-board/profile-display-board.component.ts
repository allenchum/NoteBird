import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
