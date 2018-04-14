// drawing
import { Injectable } from "@angular/core";
import { NotePin } from "./NotePin";
import { element } from "protractor";
// service
import { environment } from "../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "./auth.service";
import 'rxjs/Rx';

@Injectable()
export class NotePinService {
  constructor(private http: HttpClient, private authService: AuthService) { }

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
  }

  getXYDistance(p1, p2) {
    let dx = p2[0] - p1[0],
      dy = p2[1] - p1[1];
    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
  }

  getNotePins(notePinObj) {
    // For Authentication
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    let options = { headers: headers };
    return this.http.post(`${environment.apiServer}/api/noteAndPin`, notePinObj, options).subscribe((res: any) => {
      console.log(res)
      alert(`Note is saved as ${res.status} with note ID ${res.noteID}`)
      // need some logic to differentiate "draft" and "publish"
      // like re-direct? disable certain button.
    });
  }
}
