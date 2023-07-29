import { Component, OnInit } from '@angular/core';
import { NasaImageService } from '../services/nasa-image.service';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss'],
})
export class FeaturedComponent implements OnInit {
  pictureOfTheDay: any = {}
  constructor(private nasaImageService: NasaImageService) {}

  ngOnInit(): void {
    this.nasaImageService.pictureOfTheDay.subscribe((image: {}) => {
      this.pictureOfTheDay = image;
    });
  }
}
