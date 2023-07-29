import { Component } from '@angular/core';
import { NasaImageService } from '../services/nasa-image.service'; // Update with the correct path
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
})
export class SearchBarComponent {
  searchTerm: string = '';
  mediaType: string = 'image';
  searchType: string = 'q';

  constructor(
    private nasaImageService: NasaImageService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.nasaImageService
      .getImage(this.searchTerm, this.mediaType, this.searchType)
      .subscribe((images) => {
        this.nasaImageService.changeImages(images);
      });
    this.router.navigate(['/cards']);
  }
}
