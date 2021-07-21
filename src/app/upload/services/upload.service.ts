import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import * as e from "../../../environments/environment.prod"
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UploadService {
  FOLDER: any;

  constructor(private http: HttpClient) { }

  uploadImageToS3(base64Image: any) {

  }

  imageUpload(imageForm: FormData) {
    console.log('image uploading');
    return this.http.post('http://localhost:3000/api/v1/upload',
      imageForm);
  }

}
