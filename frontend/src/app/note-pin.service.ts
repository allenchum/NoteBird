import { Injectable } from "@angular/core";
import { NotePin } from "./NotePin";
import { element } from "protractor";

@Injectable()
export class NotePinService {
  constructor() {}

  //Store all the pins in this list
  pinList: NotePin[] = [];

  //mark the selected pin
  selectedPin: NotePin;

  select(e) {
    let p1 = [e.clientX, e.clientY],
        p2 = [e.clientX, e.clientY];

    let editOldPin: boolean = false;
    //Drag old pin
    this.pinList.map(pin => {
      if (this.getXYDistance(pin.p2, p2) < 40) {
        editOldPin = true;
        pin.dragging = true;
        this.selectedPin = pin;
        return;
      }
    });

    //creating new pin
    if (!editOldPin) {
      let newPin = new NotePin();
      (newPin.p1 = p1), (newPin.p2 = p2);

      newPin.setData(newPin.p1, newPin.p2);
      newPin.dragging = true;

      this.pinList.push(newPin);
      console.log(window.innerWidth, window.innerHeight);
      this.selectedPin = newPin;
    }
  }

  move(e) {
    if (this.selectedPin) {
      this.selectedPin.move(e);
    }
  }

  drop(e) {
    if (this.selectedPin) {
      this.selectedPin.drop(e);
    }
        console.log(this.pinList)
  }

  getXYDistance(p1, p2) {
    let dx = p2[0] - p1[0],
      dy = p2[1] - p1[1];
    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
  }
}
