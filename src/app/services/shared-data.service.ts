import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private cardDataSubject = new BehaviorSubject<any>(null);
  cardData$ = this.cardDataSubject.asObservable();

  updateCardData(cardData: any) {
    this.cardDataSubject.next(cardData);
  }
}