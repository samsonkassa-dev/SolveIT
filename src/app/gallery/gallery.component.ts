import { Component, OnInit } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  constructor() { }

  ngOnInit() {
    this.galleryOptions = [
      {
          width: '80%',
          height: '600px',
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
          breakpoint: 800,
          width: '100%',
          height: '600px',
          imagePercent: 80,
          thumbnailsPercent: 20,
          thumbnailsMargin: 20,
          thumbnailMargin: 20
      },
      // max-width 400
      {
          breakpoint: 400,
          preview: false
      }
  ];

  this.galleryImages = [
      {
          small: "../../assets/img/bg.jpg",
          medium: "../../assets/img/bg.jpg",
          big: "../../assets/img/bg.jpg"
      },
      {
        small: "../../assets/img/bg.jpg",
        medium: "../../assets/img/bg.jpg",
        big: "../../assets/img/bg.jpg"
    },
    {
      small: "../../assets/img/bg.jpg",
      medium: "../../assets/img/bg.jpg",
      big: "../../assets/img/bg.jpg"
  },
      
  ];
  }

}
