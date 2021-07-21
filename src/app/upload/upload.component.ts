import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UploadService } from './services/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  @ViewChild('video')
  public video!: ElementRef;

  @ViewChild('canvas')
  public canvas!: ElementRef;

  imageObj: any | undefined;
  imageUrl: string | undefined;

  public constructor(private uploadService: UploadService) { }

  public ngOnInit() { }

  // using window.URL.createObjectURL will not work (and browser drop support for it) so you will need to pass the
  // stream object from the call back of getUserMedia directly to the video.nativeElement.srcObject
  // TODO: explain viewChild
  public ngAfterViewInit() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        this.video.nativeElement.srcObject = stream;
        this.video.nativeElement.play();
      });
    }
  }

  public capture() {
    // you will need to draw the image on a canvas so you can extract the data and save it
    // the canvas will be display:none
    this.canvas.nativeElement
      .getContext('2d')
      .drawImage(this.video.nativeElement, 0, 0, 640, 480);
    // send the image as base64 to the server
    this.uploadToServer(this.canvas.nativeElement.toDataURL('image/png'));
  }

  onFileSelected(fileInputEvent: any) {
    let file = fileInputEvent.target.files[0];
    let reader = new FileReader();

    this.uploadToServer(file)
    // //convert file (any file) to DataUrl
    // reader.readAsDataURL(file);
    // // make reference to the method so you can pass the reader results
    // let f = (file: any) => {
    //   this.uploadToServer(file);
    // };
    // // after the reader is finished
    // reader.onload = () => {
    //   // call the method reference
    //   f(reader.result);
    // };
  }

  uploadToServer(base64Image: any) {
    //this.uploadService.uploadImageToS3(base64Image)

    const imageForm = new FormData();
    imageForm.append('image', base64Image);
    this.uploadService.imageUpload(imageForm).subscribe(res => {
      console.log(res)
    });
  }

}
