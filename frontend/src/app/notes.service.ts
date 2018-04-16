import { Injectable } from "@angular/core";
import { NoteImage } from './NoteImage';
import { NotePin } from './NotePin';
import { element } from "protractor";
import { environment } from "../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "./auth.service";
import 'rxjs/Rx';

@Injectable()
export class NotesService {
    userID: string = null;
    id: number;
    constructor( private http: HttpClient, private authService: AuthService ){

    }

    // get all notes of the user logged in.
    // the returned object only consists of first image.
    getNotes(){
        // For Authentication
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
        let options = {headers:headers};
        return this.http.get(`${environment.apiServer}/api/noteAndPin/userNote`, options).map((res:any)=>{
          return res.map(res => res);
        });
    }

    // not yet called in component, this is to get a specific note.
    // need to pass in noteID ${id} in link.
    getSpecificNote(id){
        // For Authentication
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
        let options = {headers:headers};
        return this.http.get(`${environment.apiServer}/api/noteAndPin/note/${id}`, options).map((res:any)=>{
          return res.map(res => res);
        });
    }



}
