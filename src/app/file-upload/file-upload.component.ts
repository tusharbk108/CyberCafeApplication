import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RegisterserviceService } from '../service/registerservice.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  selectedFiles?: FileList;
  selectedId?:FileList;
  currentFile?: File;
  currentId?: File;
  message = '';
  email:any;
  progress = 0;
  progress1 = 0;

  constructor(private router:Router, private registerservice:RegisterserviceService,
    private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.email =this.route.snapshot.params['email'];
  }
  selectFile(event:any) {
    this.selectedFiles = event.target.files;
  }
  selectId(event:any) {
    this.selectedId = event.target.files;
  }
  upload(): void {
    this.progress = 0;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        console.log(this.selectFile+":"+this.currentFile)
        this.registerservice.upload(this.currentFile,this.email).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
             
            }
          },
          error: (err: any) => {
            console.log(err);
           
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }
          
            this.currentFile = undefined;
          }
          
        });
      }

      this.selectedFiles = undefined;
    }
  }


  uploadId(): void {
    this.progress1 = 0;
    if (this.selectedId) {
      const file: File | null = this.selectedId.item(0);
      if (file) {
        this.currentId = file;
        console.log(this.selectFile+":"+this.currentId)
        this.registerservice.uploadId(this.currentId,this.email).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress1 = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
             
            }
          },
          error: (err: any) => {
            console.log(err);
           
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }
          
            this.currentId = undefined;
          }
        });
      }

      this.selectedId= undefined;
    }
  }
  
  Submit(){
    this.upload();
    this.uploadId();
    alert("upload Succefully");
    this.router.navigate(['/login']);
  }

}
