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
    const url = this.nasaImageService.createUrl(
      this.searchTerm,
      this.mediaType,
      this.searchType
    );
    
    this.router.navigate(['/cards', url]);
  }
}
