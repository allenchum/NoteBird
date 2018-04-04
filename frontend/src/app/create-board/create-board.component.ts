import { Component, OnInit } from '@angular/core';
import { NoteImageService } from '../note-image.service';
import { NoteImage } from '../NoteImage';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.css']
})
export class CreateBoardComponent implements OnInit {

  constructor(private noteImageService: NoteImageService,) { }

  ngOnInit() {

  }

  private imageList = this.noteImageService.imageList;

}
