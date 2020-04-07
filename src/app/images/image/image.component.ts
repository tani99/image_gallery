import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  AngularFireStorage,
  AngularFireUploadTask
} from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';
import { ImageService } from 'src/app/shared/image.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html'
})
export class ImageComponent implements OnInit {
  imgSrc: string = '/assets/img/image_placeholder.png';
  selectedImage: any = null;
  isSubmitted: boolean = false;
  uploadProgress: Observable<number>;
  uploadTask: AngularFireUploadTask;

  formTemplate = new FormGroup({
    caption: new FormControl('', Validators.required),
    category: new FormControl(''),
    imageURL: new FormControl('', Validators.required)
  });
  constructor(
    private storage: AngularFireStorage,
    private service: ImageService
  ) {}

  ngOnInit(): void {
    this.resetForm();
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgSrc = e.target.result);
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imgSrc = '/assets/img/image_placeholder.png';
      this.selectedImage = null;
    }
  }

  onSubmit(formValue) {
    this.isSubmitted = true;
    if (this.formTemplate.valid) {
      console.log(this.selectedImage);
      var filePath = `images/${this.selectedImage.name
        .split('.')
        .slice(0, -1)
        .join('.')}_${new Date().getTime()}`;
      var fileRef = this.storage.ref(filePath);
      this.uploadTask = this.storage.upload(filePath, this.selectedImage);

      this.uploadTask
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              formValue['imageURL'] = url;
              var currentDate = new Date();

              var date = currentDate.getDate();
              var month = currentDate.getMonth(); //Be careful! January is 0 not 1
              var year = currentDate.getFullYear();

              var timestamp = date + '-' + (month + 1) + '-' + year;

              formValue['timestamp'] = timestamp;
              this.service.insertImageDetails(formValue);
              this.resetForm();
            });
          })
        )
        .subscribe();
      this.uploadProgress = this.uploadTask.percentageChanges();
    }
  }

  get formControls() {
    return this.formTemplate['controls'];
  }

  resetForm() {
    this.formTemplate.reset();
    this.formTemplate.setValue({
      caption: '',
      category: '1',
      imageURL: ''
    });
    this.imgSrc = '/assets/img/upload.gif';
    this.isSubmitted = false;
    this.selectedImage = null;
    this.uploadTask = null;
    this.uploadProgress = null;
  }
}
