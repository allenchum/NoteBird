import { Component, OnInit ,Input} from '@angular/core';
import { NotePin } from '../NotePin';


@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent implements OnInit {
  @Input() pin: NotePin;

  constructor() { }

  ngOnInit() {

  }

}
