import { Component } from '@angular/core';
import { NasaImageService } from '../services/nasa-image.service'; // Update with the correct path

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
})
export class SearchBarComponent {
  searchTerm: string = '';

  constructor(private nasaImageService: NasaImageService) {}

  onSubmit(): void {
    this.nasaImageService.getImage(this.searchTerm).subscribe((images) => {
      this.nasaImageService.changeImages(images);
    });
  }
}
