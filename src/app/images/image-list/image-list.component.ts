import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/shared/image.service';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html'
})
export class ImageListComponent implements OnInit {
  imageList: any[];
  rawIndexArray: any[];
  constructor(private service: ImageService) {}

  ngOnInit(): void {
    this.service.imageDetailList.snapshotChanges().subscribe(list => {
      this.imageList = list.map(item => {
        return item.payload.val();
      });
      this.rawIndexArray = Array.from(
        // To set number of rows
        Array(Math.ceil((this.imageList.length + 1) / 3)).keys()
      );
    });
  }
}
