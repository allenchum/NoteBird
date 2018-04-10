import { Component, OnInit ,Input} from '@angular/core';

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
  private selectedPin:NotePin;
  private currentService;
  noteCollapsed:boolean = false;
  imageCollapsed:boolean = true;
  pinCollapsed:boolean = true;
  publishCollapsed:boolean = true;
  note={"name":"League of Leagends"};
  
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

  onSelect(pin:NotePin):void{
    this.selectedPin = this.notePinService.selectedPin;
  }
  setImageLayer(){
    let style;
    if(this.currentService == this.noteImageService){
         style = {
          "z-index":"10"
         }
    }else{
         style={
          "z-index":"9"
         } 
      }
    return style;
    }

  setPinLayer(){
    let style;
    if(this.currentService == this.notePinService){
         style = {
          "z-index":"10"
         }
    }else{
         style={
          "z-index":"9"
         } 
      }
    return style;
  }

  panelActive(panel:string){
    if(panel=='note'){
      this.noteCollapsed = false;
      this.imageCollapsed = true;
      this.pinCollapsed = true;
      this.publishCollapsed = true;
    }
    if(panel=='image'){
      this.noteCollapsed = true;
      this.imageCollapsed = false;
      this.pinCollapsed = true;
      this.publishCollapsed = true;
    }
    if(panel=='pin'){
      this.noteCollapsed = true;
      this.imageCollapsed = true;
      this.pinCollapsed = false;
      this.publishCollapsed = true;
    }
    if(panel=='publish'){
      this.noteCollapsed = true;
      this.imageCollapsed = true;
      this.pinCollapsed = true;
      this.publishCollapsed = false;
    }
  }
  


}
