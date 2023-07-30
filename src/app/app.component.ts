import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NasaImageService } from './services/nasa-image.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'my-angular-app';
  showSearchBar: boolean = true;
  pictureOfTheDay: any = {}

  constructor(
    private router: Router,
    private nasaImageService: NasaImageService
  ) {}

  ngOnInit() {
    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     this.showSearchBar = event.url === '/cards' || event.url === '/';
    //   }
    // });
    this.nasaImageService.getPictureOfTheDay().subscribe((image) => {
      this.pictureOfTheDay = image;
      this.nasaImageService.pictureOfTheDay.next(image);
    });
  }
}
