import { Component, HostListener, OnInit } from '@angular/core';
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
  search: string = '';
  nextPageUrl: string = '';
  constructor(
    private nasaImageService: NasaImageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let reload = true;
    this.nasaImageService.currentImages.subscribe((images) => {
      //     this.cards = []
      //   console.log(images);
      //   this.parseImages(images);
      const search = this.route.snapshot.params.search;

      if (search) {
        this.search = search;
        // Fetch images using the search parameter
        this.nasaImageService
          .getImagesByUrlSearch(search)
          .subscribe((images: any) => {
            if(images){
                console.log(images);
                this.cards = [];
                this.nextPageUrl = images.collection.links[0].href;
                this.parseImages(images);
            }
          });
      }
    });
    // Get the search parameter from the URL
  }

  onCardClick(card: any) {
    // navigate to the detail page with the card id
    console.log('CRAD', card);
    const page = ~~(card.id / 100) + 1
    const id = card.id - (page * 100 - 100)
    console.log("PAGE", page, id)
    this.router.navigate(['/detail', this.search + `&page=${page}`, id]);
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
    let id = this.cards.length;
    // const cards: {}[] = [];
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
        this.cards.push(card);
        id++;
      } catch (err) {
        console.log(err);
      }
    });

    // this.cards = cards;
  }

  replaceSpaces(url: string): string {
    return url.split(' ').join('%20');
  }

  loadMoreItems() {

    this.nasaImageService
      .loadNextPage(this.nextPageUrl)
      .subscribe((response: any) => {
        const nextLinkObj = response.collection.links.find(
          (link: any) => link.rel === 'next'
        );
        this.nextPageUrl = nextLinkObj.href;

        this.parseImages(response);
      });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Check if we are near the bottom of the container.
    const pos =
      (document.documentElement.scrollTop || document.body.scrollTop) +
      document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;

    if (pos >= max - 100) {
      // 100px from the bottom
      this.loadMoreItems();
    }
  }
}
