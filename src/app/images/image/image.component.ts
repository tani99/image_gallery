import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  AngularFireStorage,
  AngularFireUploadTask
} from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';
import { ImageService } from 'src/app/Services/image.service';
import { Observable } from 'rxjs/Observable';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html'
})
export class ImageComponent implements OnInit {
  // Set a default image which can be clicked on to open the file selector.
  imgSrc: string = '/assets/img/image_placeholder.png';
  selectedImage: any = null;
  isSubmitted: boolean = false;
  uploadProgress: Observable<number>;
  uploadTask: AngularFireUploadTask;
  uploadComplete: boolean = false;
  // Cropping an image
  imageChangedEvent: any = '';
  croppedImage: any = '';
  showImageCropper: boolean = false;

  formTemplate = new FormGroup({
    caption: new FormControl('', Validators.required),
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
    this.uploadComplete = false;
    this.imageChangedEvent = event;
    this.showImageCropper = true;
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      // reader.onload = (e: any) => (this.imgSrc = e.target.result);
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
      // Add time to file path to ensure unique file names.
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
              formValue['imageURL'] = this.imgSrc;
              var currentDate = new Date();

              var date = currentDate.getDate();
              var month = currentDate.getMonth();
              var year = currentDate.getFullYear();

              var timestamp = date + '-' + (month + 1) + '-' + year;

              formValue['timestamp'] = timestamp;
              this.service.insertImageDetails(formValue);

              // Reset form values once uploading is complete/
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
      imageURL: ''
    });
    this.imgSrc = '/assets/img/image_placeholder.png';
    this.isSubmitted = false;
    this.selectedImage = null;
    this.uploadTask = null;
    this.uploadProgress = null;
    this.showImageCropper = false;

    // Uploading is complete
    this.uploadComplete = true;
  }

  // Cropping images
  imageCropped(event: ImageCroppedEvent) {
    // Replace the image source to be stored as the cropped image
    this.imgSrc = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
}
