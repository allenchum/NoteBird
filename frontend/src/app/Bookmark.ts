import {Note} from "./Note";

export class Bookmark{
    name:string;
    elements: Note[];
    constructor(name){
      this.name = name;
    }
}