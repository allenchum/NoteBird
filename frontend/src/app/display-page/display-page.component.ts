import { Component, OnInit } from '@angular/core';
import { Note } from '../Note';
import { NoteImage } from '../NoteImage';
import { NotePin } from '../NotePin';
import { ActivatedRoute } from '@angular/router';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-display-page',
  templateUrl: './display-page.component.html',
  styleUrls: ['./display-page.component.css']
})
export class DisplayPageComponent implements OnInit {
  private userID: number;
  private noteID: number;
  private reqNote: any;

  constructor(private route: ActivatedRoute, private notesService: NotesService) { }

  ngOnInit(){
    this.route.paramMap.subscribe(params=>{
      this.userID = +params.get('userID');
      this.noteID = +params.get('noteID');
      console.log(params)
      console.log(this.userID,this.noteID)
    });
    this.notesService.getOthersNoteByID(this.userID,this.noteID).subscribe(res=>{
       this.reqNote = res[0];
       this.imageList = this.reqNote.imageList;
       this.pinList = this.reqNote.pinList;
       console.log(this.imageList)
       console.log("PinList:",this.pinList)
       //this.tagsList = this.reqNote.t
      }
    );
  }

//Set up variables
private imageList: NoteImage[];
private pinList: NotePin[];
private tagsList;


}
