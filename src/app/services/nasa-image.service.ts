import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NasaImageService {
  private API_URL = 'https://images-api.nasa.gov';
  private imagesSource = new BehaviorSubject<any>({});
  pictureOfTheDay = new BehaviorSubject<any>({});
  private collection = new BehaviorSubject<any>({});
  currentImages = this.imagesSource.asObservable();

  constructor(private http: HttpClient) { }

  getImage(searchTerm: string, mediaType: string, searchType: string): Observable<any> {
    let url = `${this.API_URL}/search?`
    if(searchType === "keywords"){
        const keywoords = searchTerm.split(" ").join(",")
        url = url + `keywords=${keywoords}`
    }
    if(searchType === "q"){
        url = url + `q=${searchTerm}`
    }

    if(mediaType !== 'all'){
        url = url + `&media_type=${mediaType}`;
    }
    return this.http.get(url);
  }

  getPictureOfTheDay(): Observable<any> {
    return this.http.get("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY")

  }

  getCollection(dataUrl: string): Observable<any> {
    console.log("HELLO DATA", dataUrl)
    return this.http.get(dataUrl);
  }

  getAssetById(id: string): Observable<any> {
    console.log(id)
    return this.http.get(`${this.API_URL}/asset/${id}`)
  }

  changeCollection(collection: any) {
    console.log("HELLO WORLD")
    this.collection.next(collection)
  }

  changeImages(images: any) {
    this.imagesSource.next(images);
  }
}
