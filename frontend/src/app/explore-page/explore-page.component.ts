import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-explore-page',
  templateUrl: './explore-page.component.html',
  styleUrls: ['./explore-page.component.css']
})
export class ExplorePageComponent implements OnInit {
  private searchSelector: string;

  constructor() { }

  ngOnInit() {
  }

// limit the number of checkbox to only one. Return the search criteria.

searchByChange(args){
  let val = args.target.value;
  this.searchSelector = val;
}
}
