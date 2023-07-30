import { Component, OnInit } from '@angular/core';
import { NasaImageService } from '../services/nasa-image.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  cards: any = [];
  noResults: boolean = false;
  noSearch: boolean = true;
  search: string = "";
  pictureOfTheDay: any = { hdurl: './assets/catching_some_sun.jpeg' };
  constructor(
    private nasaImageService: NasaImageService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.nasaImageService.currentImages.subscribe((images) => {
      console.log(images);
      this.parseImages(images);
    });

    this.nasaImageService.pictureOfTheDay.subscribe((image: {}) => {
      if (Object.keys(image).length) {
        this.pictureOfTheDay = image;
      }
    });

    // Get the search parameter from the URL
    const search = this.route.snapshot.params.search;

    if (search) {
      this.search = search;
      // Fetch images using the search parameter
      this.nasaImageService.getImagesByUrlSearch(search).subscribe((images) => {
        console.log(images);
        this.parseImages(images);
      });
    }
  }

  onCardClick(card: any) {
    // navigate to the detail page with the card id
    console.log('CRAD', card);
    this.router.navigate(['/detail', this.search, card.id]);
  }

  parseImages(images: any) {
    if (!images.collection) {
      return;
    }
    this.noSearch = false;
    if (!images.collection.items.length) {
      this.noResults = true;
      return;
    }
    console.log('Parsing images', images.collection);
    let id = 0;
    const cards: {}[] = [];
    images.collection.items.forEach((item: any) => {
      try {
        const nasaId = item.data[0].nasa_id;
        const title = item.data[0].title;
        const description = item.data[0].description;
        const collection = item.href;
        const center = item.data[0].center;
        const createdAt = item.data[0].date_created;
        const image = this.replaceSpaces(item.links[0].href);
        const mediaType = item.data[0].media_type;
        const albumName = item.data[0].album_name;

        const card = {
          id,
          nasaId,
          title,
          description,
          image,
          collection,
          center,
          createdAt,
          mediaType,
          albumName,
        };
        cards.push(card);
        id++;
      } catch (err) {
        console.log(err);
      }
    });

    this.cards = cards;
  }

  replaceSpaces(url: string): string {
    return url.split(' ').join('%20');
  }
}
