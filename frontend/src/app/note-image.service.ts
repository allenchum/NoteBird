import { Injectable } from "@angular/core";
import { NoteImage } from "./NoteImage";
import { UploadService } from './image-upload.service'

import { environment } from "../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "./auth.service";

@Injectable()
export class NoteImageService {
  constructor(
    private uploadService: UploadService,
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  //use imageList to store all the images
  imageList: NoteImage[] = [];

  //Store the selectedImage
  selectedImage: NoteImage;

  uploadAvatar(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('avatar', file, file.name);
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
      let options = { headers: headers };
      this.http.post(`${environment.apiServer}/multer`, formData, options)
        .map((res:any) => this.addNew(`${environment.apiServer}${res.filePath}`))
        .catch(function(err) {
          throw err;
        }).subscribe()
    }
  }
  //push a new image to the list
  addNew(url: string) {
    let image = new NoteImage();
    image.url = url;
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
