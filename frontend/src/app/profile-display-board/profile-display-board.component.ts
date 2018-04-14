import { Component, OnInit } from '@angular/core';
import { SearchFilterPipe } from '../search-filter.pipe';


@Component({
  selector: 'app-profile-display-board',
  templateUrl: './profile-display-board.component.html',
  styleUrls: ['./profile-display-board.component.css'],
})
export class ProfileDisplayBoardComponent implements OnInit {
  term:string = "";

  group = {
    name:"English",
    elements: [{title:"ABC"},{title:"DEF"},{title:"HJK"},{title:"UIO"},{title:"OPL"},{title:"NMB"},{title:"QWE"},{title:"BVC"},{title:"QSA"},{title:"TYE"}]
  };

  constructor() { }

  ngOnInit() {
  }

}
