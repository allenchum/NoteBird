import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(notes: any, term: any, selector:string): any {
    if (term === undefined){
      return notes;
    }else if(selector == "title"){
      return notes.filter(function(note){
        return note.note_title.toLowerCase().includes(term.toLowerCase());
      })
    }else if(selector == "author"){
      return notes.filter(function(note){
        return note.author.toLowerCase().includes(term.toLowerCase());
      })
    }else if(selector == "tags"){
      return notes.filter(function(note){
        return note.tags.toLowerCase().includes(term.toLowerCase());
      })
    }
  }
}
