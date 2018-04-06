import { Injectable } from "@angular/core";
import { NotePin } from "./NotePin";

@Injectable()
export class NotePinService {
  constructor() {}

  //Store all the pins in this list
  pinList: NotePin[] = [];

  //mark the selected pin
  selectedPin: NotePin;



  select(e){
    console.log("new Pin Created!");

    //creating new pin
    let newPin = new NotePin();
    newPin.p1[0] = e.clientX,
    newPin.p1[1] = e.clientY,
    newPin.p2[0] = e.clientX,
    newPin.p2[1] = e.clientY,
    newPin.dragging = true;

    this.pinList.push(newPin);
    this.selectedPin = newPin;
  }

  move(e){
    if (this.selectedPin) {
      this.selectedPin.move(e);
    }
  }

  drop(e) {
    if (this.selectedPin) {
      this.selectedPin.drop(e);
    }
  }
}
