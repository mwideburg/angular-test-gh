import { Component, OnInit } from '@angular/core';
import { NasaImageService } from '../services/nasa-image.service';

@Component({
  selector: 'app-picture-of-the-day',
  templateUrl: './picture-of-the-day.component.html',
  styleUrls: ['./picture-of-the-day.component.scss']
})
export class PictureOfTheDayComponent implements OnInit {
    pictureOfTheDay: any = {}
  constructor(private nasaImageService: NasaImageService) { }

  ngOnInit(): void {
    this.nasaImageService.getPictureOfTheDay().subscribe((image) => {
      this.pictureOfTheDay = image;
      this.nasaImageService.pictureOfTheDay.next(image);
    });
  }

}
