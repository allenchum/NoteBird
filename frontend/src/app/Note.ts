import {NoteImage} from './NoteImage';
import {NotePin} from './NotePin';


export class Note{
    constructor(){

    }
    title:string;
    imageList: NoteImage [];
    pinList: NotePin[];
    tags: string[];
}