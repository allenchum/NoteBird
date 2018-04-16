import {NoteImage} from './NoteImage';
import {NotePin} from './NotePin';


export class Note{
    constructor(){

    }

    
    title:string;
    imageList: NoteImage [];
    pinList: NotePin[];
    tagsList: string[];
    userID: number;
    noteID: number;
    status: string;


}