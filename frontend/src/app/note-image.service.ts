import { Injectable } from "@angular/core";
import { NoteImage } from "./NoteImage";

@Injectable()
export class NoteImageService {
  constructor() {}

  //use imageList to store all the images
  imageList: NoteImage[] = [];

  //Store the selectedImage
  selectedImage: NoteImage;

  //push a new image to the list
  addNew(url: string) {
    let image = new NoteImage();
    image.url = "/assets/img/AmumuSquare.png";
    image.style = {
      "top": "50%",
      "left": "50%",
      "height": "330px",
      "width": "330px",
      "border": "none"
    };
    image.coords = [image.style.left, image.style.top];
    this.imageList.push(image);
  }

  select(image: NoteImage, e) {
    image.select(e);
    this.selectedImage = image;
  }

  move(e) {
    if (this.selectedImage) {
      if (!this.selectedImage.dragging) {
        return;
      }
        this.selectedImage.move(e);
    }
  }

  drop(image: NoteImage, e) {
    this.selectedImage.drop(e);
    this.selectedImage.dragging = false;
  }
}
