import { Component, OnInit} from '@angular/core';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import {ActionSheetController, LoadingController, ToastController} from '@ionic/angular';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {concat} from 'rxjs';
import {PhotoService} from '../../services/photo.service';
@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.page.html',
  styleUrls: ['./upload-photo.page.scss'],
})
export class UploadPhotoPage implements OnInit {
  public filePreviewPath: SafeUrl = [];
  constructor(private uploadingService: PhotoService,private sanitizer: DomSanitizer) {
    this.fileUploader.onAfterAddingFile = (fileItem) => {
      this.filePreviewPath  = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(fileItem._file)));
    };

  }
  public fileUploader: FileUploader = new FileUploader({});
  public hasBaseDropZoneOver = false;
  public imagePath;
  imgURL: any;
  public message: string;


  preview(files) {
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

  ngOnInit() {
  }


  fileOverBase(event): void {
    this.hasBaseDropZoneOver = event;
  }
  getFiles(): FileLikeObject[] {
    return this.fileUploader.queue.map((fileItem) => {
      console.log(fileItem.file);
      return fileItem.file;

    });
  }

  uploadFiles() {

    const files = this.getFiles();
    const requests = [];
    files.forEach((file) => {
      console.log(file.name);


      const formData = new FormData();
      formData.append('porcodio' , file.rawFile, file.name);
      formData.append('title', 'prova del cazzo');
      formData.append('description', 'questa è proprio una bella prova del cazzo...');
      // formData.append('info','')
      // formData.append('file' , file.rawFile);
      console.log(formData.getAll('porcodio'));
      requests.push(this.uploadingService.uploadFormData(formData));
      concat(...requests).subscribe(
          (res) => {
            console.log(res);
          },
          (err) => {
            console.log(err);
          }
      );

    });

    concat(...requests).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
    );
  }



}
