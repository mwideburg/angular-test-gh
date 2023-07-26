import { Component, OnInit } from '@angular/core';
import { NasaImageService } from '../services/nasa-image.service';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  cards: any = []
  noResults: boolean = false;
  noSearch: boolean = true;
  constructor(private nasaImageService: NasaImageService) {}

  ngOnInit(): void {
    this.nasaImageService.currentImages.subscribe((images) => {
      console.log(images);
      this.parseImages(images);
    });
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
            const title = item.data[0].title;
            const content = item.data[0].description;
            const image = item.links[0].href;
      
            const card = {
              title,
              content,
              image,
            };
            cards.push(card);
        }catch(err){
            console.log(err)
        }
    });
    
    this.cards = cards;
  }
}
