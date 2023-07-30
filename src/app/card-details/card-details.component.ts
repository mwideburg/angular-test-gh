import { Component, OnInit } from '@angular/core';
import { NasaImageService } from '../services/nasa-image.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent implements OnInit {

  cardData: any;
  additionalImages: any[] = [];

  constructor(
    private nasaImageService: NasaImageService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
  ) {
    
  }

  ngOnInit(): void {
    const search = this.route.snapshot.params.search
    const id = this.route.snapshot.params.id
    
    this.nasaImageService.getImagesByUrlSearch(search).subscribe((images: any) => {
        console.log('images', images.collection.items[id]);
        this.cardData = images.collection.items[id].data[0]
        console.log(this.cardData)
        this.nasaImageService
          .getCollection(images.collection.items[id].href)
          .subscribe((collection) => {
            const media = this.getMediaUrl(collection, this.cardData.media_type);
            this.cardData.mediaUrl = media.mediaUrl;

            this.additionalImages = collection;
          });
    })
  }

  goBack(): void {
    this.location.back();
  }

  getMediaUrl(collection: [], mediaType: string){

    let mediaUrl = ""
    for(let i = 0; i < collection.length; i++){
      const ext = this.getExt(collection[i])
      if(ext === 'jpg' &&  mediaType === "image"){
        mediaType = "image"
        mediaUrl = this.replaceSpaces(collection[i])
        i = collection.length
      }

      if(ext === 'mp4' &&  mediaType === "video"){
        mediaType = "video"
        mediaUrl = this.replaceSpaces(collection[i])
        i = collection.length
      }
    }
    return {
      mediaType,
      mediaUrl
    }
  }

  getExt(url: string){
    const splitUrl =  url.split(".")
    const length = splitUrl.length
    const ext = splitUrl[length - 1]
    return ext
  }

  replaceSpaces(url:string): string {
    return url.split(" ").join("%20")
  }

  

}
