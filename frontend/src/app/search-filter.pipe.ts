import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "searchFilter"
})
export class SearchFilterPipe implements PipeTransform {
  transform(notes: any, term: any, selector: string): any {
    if (term === undefined) {
      return notes;
    } else if (selector == "title") {
      return notes.filter(function(note) {
        return note.note_title.toLowerCase().includes(term.toLowerCase());
      });
    } else if (selector == "author") {
      return notes.filter(function(note) {
        let includeFirstName = note.firstName
          .toLowerCase()
          .includes(term.toLowerCase());
        let includeLastName = note.lastName
          .toLowerCase()
          .includes(term.toLowerCase());
        return includeFirstName || includeLastName;
      });
    } else if (selector == "tags") {
      return notes.filter(function(note) {
        let haveTag: boolean = false;
        if (note.tags) {
          for (let i = 0; i < note.tags.length; i++) {
            if (note.tags[i].toLowerCase().includes(term.toLowerCase())) {
              haveTag = true;
              i = note.tags.length;
            } else {
              haveTag = false;
            }
          }
        }
        return haveTag;
      });
    }
  }
}
