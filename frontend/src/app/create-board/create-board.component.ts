import { Component, OnInit } from '@angular/core';

import { NoteImageService } from '../note-image.service';
import { NoteImage } from '../NoteImage';

import { NotePinService } from '../note-pin.service';
import { NotePin } from '../NotePin';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.css']
})
export class CreateBoardComponent implements OnInit {

  constructor(private noteImageService: NoteImageService, private notePinService: NotePinService) { }

  private imageList = this.noteImageService.imageList;
  private pinList = this.notePinService.pinList;
  private currentService;
  
  ngOnInit() {
    this.currentService = this.notePinService;
  }

  switchService(s:string){
    if(s=="pin"){
      this.currentService = this.notePinService;
    }else if(s=="image"){
      this.currentService = this.noteImageService;
    }
  }
}
