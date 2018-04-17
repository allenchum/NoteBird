import { Component, OnInit } from '@angular/core';
import { NotesService } from '../notes.service';
import { environment } from "../../environments/environment";
import { Observable } from 'rxjs';
import { AuthService } from "../auth.service";


@Component({
  selector: 'app-explore-page',
  templateUrl: './explore-page.component.html',
  styleUrls: ['./explore-page.component.css']
})
export class ExplorePageComponent implements OnInit {

  private term:string;
  private searchSelector:string = "title";
  private Notes:any;
  private notesObservable: Observable<any>;

  constructor(private authService: AuthService, private notesService:NotesService) { }

  ngOnInit() {
    this.notesObservable = this.notesService.getNotes();

    this.notesService.getNotes().subscribe((notes)=>{
      this.Notes = notes;
      console.log("FE:", notes)
    });
  }

// limit the number of checkbox to only one. Return the search criteria.

  searchByChange(args){
    let val = args.target.value;
    this.searchSelector = val;
  }
}
