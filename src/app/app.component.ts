import { Component, Inject } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { FileService } from './Services/file.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // selectedImage: any = null;
  // url: string;
  // id: string;
  // file: string;
  // constructor(
  //   @Inject(AngularFireStorage) private storage: AngularFireStorage,
  //   @Inject(FileService) private fileService: FileService
  // ) {}
  // ngOnInit() {
  //   this.fileService.getImageDetailList();
  // }
  // showPreview(event: any) {
  //   this.selectedImage = event.target.files[0];
  // }
  // save() {
  //   var name = this.selectedImage.name;
  //   const fileRef = this.storage.ref(name);
  //   this.storage
  //     .upload(name, this.selectedImage)
  //     .snapshotChanges()
  //     .pipe(
  //       finalize(() => {
  //         fileRef.getDownloadURL().subscribe(url => {
  //           this.url = url;
  //           this.fileService.insertImageDetails(this.id, this.url);
  //           alert('Upload Successful');
  //         });
  //       })
  //     )
  //     .subscribe();
  // }
  // view() {
  //   this.fileService.getImage(this.file);
  // }
}

// import { Component, OnInit, Inject, Injectable } from '@angular/core';
// import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
// import { map } from 'rxjs/operators/map';

// import {
//   AngularFireStorage,
//   AngularFireStorageReference,
//   AngularFireUploadTask
// } from 'angularfire2/storage';
// import { Observable } from 'rxjs/Observable';
// import { finalize } from 'rxjs/operators';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   // selectedImage: any = null;
//   // url: string;
//   // id: string;
//   // file: string;
//   constructor(
//     private storage: AngularFireStorage,
//     private fileService: FileService
//   ) {}
//   // ngOnInit() {
//   //   this.fileService.getImageDetailList();
//   // }
//   // showPreview(event: any) {
//   //   this.selectedImage = event.target.files[0];
//   // }
//   // save() {
//   //   var name = this.selectedImage.name;
//   //   const fileRef = this.storage.ref(name);
//   //   this.storage
//   //     .upload(name, this.selectedImage)
//   //     .snapshotChanges()
//   //     .pipe(
//   //       finalize(() => {
//   //         fileRef.getDownloadURL().subscribe(url => {
//   //           this.url = url;
//   //           this.fileService.insertImageDetails(this.id, this.url);
//   //           alert('Upload Successful');
//   //         });
//   //       })
//   //     )
//   //     .subscribe();
//   // }
//   // view() {
//   //   this.fileService.getImage(this.file);
//   // }

//   // title = 'image-gallery';
//   // ref: AngularFireStorageReference;
//   // task: AngularFireUploadTask;
//   // uploadProgress: Observable<number>;
//   // downloadURL: Observable<string>;
//   // uploadState: Observable<string>;
//   // images: Array<Observable<string>>;
//   // ids: Array<string>;
//   // constructor(private afStorage: AngularFireStorage) {
//   // this.images = [];
//   // this.ids = [];
//   // const storage =
//   // for(let image in storage){
//   // }
//   // }

//   // upload(event) {
//   //   const id = Math.random()
//   //     .toString(36)
//   //     .substring(2);
//   //   this.ids.push(id);
//   //   this.ref = this.afStorage.ref(id);
//   //   this.task = this.ref.put(event.target.files[0]);
//   //   // this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
//   //   this.uploadProgress = this.task.percentageChanges();
//   //   this.downloadURL = this.afStorage.ref('4ieosq6t2hk').getDownloadURL();
//   //   const url = this.afStorage.ref(id).getDownloadURL();
//   //   this.images.push(url);
//   //   console.log(this.downloadURL);
//   //   console.log(this.afStorage);
//   // }
// }
