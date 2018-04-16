import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "./auth.service";
import 'rxjs/Rx';

@Injectable()
export class UploadService {
  constructor(private http: HttpClient,
              private authService: AuthService,) {
               }

  filesToUpload: Array<File> = [];

  uploadAvatar(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('avatar', file, file.name);
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
      let options = { headers: headers };
      this.http.post(`${environment.apiServer}/multer`, formData, options)
        .map(res => res)
        .catch(function(err) {
          throw err;
        })
        .subscribe(
          data => data
        )
    }
  }

}
