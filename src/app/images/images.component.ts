import { Component, OnInit } from '@angular/core';
import { ImageService } from '../Services/image.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html'
})
export class ImagesComponent implements OnInit {
  constructor(private service: ImageService) {}

  ngOnInit(): void {
    this.service.getImageDetailList();
  }
}
