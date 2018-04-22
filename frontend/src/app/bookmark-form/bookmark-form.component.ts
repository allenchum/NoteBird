import { Component, OnInit } from "@angular/core";
import { BookmarkService } from "../bookmark.service";
import "rxjs/Rx";
import { Observable } from "rxjs";
import { NgForm } from "@angular/forms";
import { Bookmark } from "../Bookmark";
import swal from "sweetalert2";

@Component({
  selector: "app-bookmark-form",
  templateUrl: "./bookmark-form.component.html",
  styleUrls: ["./bookmark-form.component.css"]
})
export class BookmarkFormComponent implements OnInit {
  private selectedItems: any = [];
  private dropdownSettings = {};
  private bookmarkTitle: string;
  private notesListObservable: Observable<any>;
  private submitted = false;

  constructor(private bookmarkService: BookmarkService) {}

  ngOnInit() {
    // this.notesListObservable = this.bookmarkService.getNotesList();
    this.bookmarkService.getNotesList().subscribe(notes => {
      this.bookmarkService.notesList = notes;
      console.log("NOTES:", notes);
    });

    this.selectedItems = [];

    this.dropdownSettings = {
      singleSelection: false,
      text: "Select Note",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      enableSearchFilter: true,
      classes: "myclass custom-class",
      labelKey: "note_title",
      primaryKey:"noteID"
    };
  }

  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  OnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onDeSelectAll(items: any) {
    console.log(items);
  }

  onBookmarkFormSubmit(f: any) {
    if (f.value["bookmark-title"] && f.value["note-list"]) {
      console.log("Note-list", f.value["note-list"]);
      let newBM = new Bookmark(f.value["bookmark-title"]);
      console.log("Selected", this.selectedItems);
      newBM.noteList = this.selectedItems;
      console.log("New Bookmark created:", newBM);

      //this.bookmarkService.bookmarksList.push(newBM);

      //Update Bookmarklist
     // this.bookmarkService.updateBookmarkList();

      this.submitted = true;
      this.bookmarkService.postBookmark(newBM).subscribe(bookmark=>{this.bookmarkService.bookmarksList.push(bookmark)
      console.log("BM res",this.bookmarkService.bookmarksList)}) ; //post new bookmark to server
      this.bookmarkService.showBookmarkForm(); //hide form
      this.clearFormData(); //clear form data
    } else {
      swal(
        "You missed something...",
        "Please enter the name of bookmark.",
        "warning"
      );
    }
  }

  clearFormData() {
    this.selectedItems = null;
    this.bookmarkTitle = null;
  }
}
