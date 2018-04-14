import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(notes: any, term: any): any {
    if (term === undefined){
      return notes;
    }else{
      return notes.filter(function(note){
        return note.title.toLowerCase().includes(term.toLowerCase());
      })
    }
  }
}
