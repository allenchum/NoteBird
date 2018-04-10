import { Injectable } from '@angular/core';

@Injectable()
export class FilterService {

  constructor() { }

  filter<T>(values:Array<T>,property:string ,term):Array<T>{
    if(!term){
      return values;
    }
    return values.filter(value => 
        value[property].toLowerCase().includes(term.toLowerCase()));
  }

}
