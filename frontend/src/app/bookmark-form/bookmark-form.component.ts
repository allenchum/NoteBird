import { Component, OnInit } from '@angular/core';
import { BookmarkService } from "../bookmark.service";

@Component({
  selector: 'app-bookmark-form',
  templateUrl: './bookmark-form.component.html',
  styleUrls: ['./bookmark-form.component.css']
})
export class BookmarkFormComponent implements OnInit {

  dropdownList = [];
  selectedNotes = [];
  dropdownSettings = {};
  notesList = [];
  

  constructor(private bookmarkService: BookmarkService) {

   }

  ngOnInit() {
    this.notesList = [
      { note_id: 1, note_name: 'Mumbai' },
      { note_id: 2, note_name: 'Bangaluru' },
      { note_id: 3, note_name: 'Pune' },
      { note_id: 4, note_name: 'Navsari' },
      { note_id: 5, note_name: 'New Delhi' }
  ];
  this.selectedNotes = [
      { note_id: 3, note_name: 'Pune' },
      { note_id: 4, note_name: 'Navsari' }
  ];
  this.dropdownSettings = {
      singleSelection: false,
      idField: 'note_id',
      textField: 'note_name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
  };
  }

  onItemSelect(item:any){
    console.log(item);
}
onSelectAll(items: any){
    console.log(items);
}
}
