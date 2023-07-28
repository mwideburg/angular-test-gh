import { Component, OnInit } from '@angular/core';
import { NasaImageService } from '../services/nasa-image.service';
import { Router } from '@angular/router';
import { SharedDataService } from '../services/shared-data.service';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  cards: any = []
  noResults: boolean = false;
  noSearch: boolean = true;
  pictureOfTheDay: any = {}
  constructor(
    private nasaImageService: NasaImageService,
    private router: Router,
    private sharedDataService: SharedDataService
    ) {}

  ngOnInit(): void {
    this.nasaImageService.currentImages.subscribe((images) => {
      console.log(images);
      this.parseImages(images);
    });
    this.nasaImageService.pictureOfTheDay.subscribe((image: {}) => {
      this.pictureOfTheDay = image
    })
  }

  onCardClick(card: any) {
    // navigate to the detail page with the card id
    console.log("CRAD", card)
    
    this.sharedDataService.updateCardData(card);
    this.router.navigate(['/detail', card.id]);
  }

  parseImages(images: any) {
    if (!images.collection) {
      return;
    }
    this.noSearch = false
    if(!images.collection.items.length){
        this.noResults = true;
        return
    }
    console.log('Parsing images', images.collection);
    const cards: {}[] = [];
    images.collection.items.forEach((item: any) => {
        try{
            const id = item.data[0].nasa_id
            const title = item.data[0].title;
            const description = item.data[0].description;
            const collection = item.href
            const center = item.data[0].center
            const createdAt = item.data[0].date_created
            const image = this.replaceSpaces(item.links[0].href);
            const mediaType = item.data[0].media_type
            const card = {
              id,
              title,
              description,
              image,
              collection,
              center,
              createdAt,
              mediaType
            };
            cards.push(card);
        }catch(err){
            console.log(err)
        }
    });
    
    this.cards = cards;
  }

  replaceSpaces(url:string): string {
    return url.split(" ").join("%20")
  }
}
