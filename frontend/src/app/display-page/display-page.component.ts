import { Component, OnInit } from '@angular/core';
import { NoteImage } from '../NoteImage';
import { NotePin } from '../NotePin';

@Component({
  selector: 'app-display-page',
  templateUrl: './display-page.component.html',
  styleUrls: ['./display-page.component.css']
})
export class DisplayPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

//Set up variables
private imageList: NoteImage[];
private pinList: NotePin[];
private tagsList;


}
