import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NasaImageService {
  private API_URL = 'https://images-api.nasa.gov';
  private imagesSource = new BehaviorSubject<any>({});
  currentImages = this.imagesSource.asObservable();

  constructor(private http: HttpClient) {}

  getImage(searchTerm: string): Observable<any> {
    return this.http.get(`${this.API_URL}/search?q=${searchTerm}`);
  }

  changeImages(images: any) {
    this.imagesSource.next(images);
  }
}
