import { Component, OnInit } from "@angular/core";
import { BookmarkService } from "../bookmark.service";
import "rxjs/Rx";
import { Observable } from "rxjs";
import { NgForm } from "@angular/forms";
import { Bookmark } from "../Bookmark";

@Component({
  selector: "app-bookmark-form",
  templateUrl: "./bookmark-form.component.html",
  styleUrls: ["./bookmark-form.component.css"]
})
export class BookmarkFormComponent implements OnInit {
  private selectedNotes:any = [];
  private dropdownSettings = {};
  private bookmarkTitle:string;
  private notesListObservable: Observable<any>;

  constructor(private bookmarkService: BookmarkService) {}

  ngOnInit() {
    this.notesListObservable = this.bookmarkService.getNotesList();
    this.bookmarkService.getNotesList().subscribe(notes => {
      this.bookmarkService.notesList = notes;
      console.log("NOTES:", notes);
    });
    this.dropdownSettings = {
      singleSelection: false,
      idField: "id",
      textField: "note_title",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  
  clearFormData(){
    this.selectedNotes = null;
    this.bookmarkTitle = null;
  }

  onBookmarkFormSubmit(f:any) {
    let newBM = new Bookmark(f.value['bookmark-title']);
    newBM.noteList = f.value['note-list'];
    console.log("New Bookmark created:",newBM);
    this.bookmarkService.postBookmark(newBM); //post new bookmark to server
    this.bookmarkService.showBookmarkForm(); //hide form
    this.clearFormData();  //clear form data
  }
}
