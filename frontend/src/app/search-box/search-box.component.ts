import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

  @Output() search  = new EventEmitter<String>();


  constructor(private _formBuilder:FormBuilder) { }

  ngOnInit(){

  }

  onKeyup(event){
    this.search.emit(event.target.value);
  }

}
