import { Injectable } from '@angular/core';
import { NewsSearchBindingModel, } from '../models/news-models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventsSearchBindingModel } from '../models/events.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }

  eventsSearch(eventsSearchBindingModel: EventsSearchBindingModel) {
      return this.http.post('SiteEvent/Search', eventsSearchBindingModel).toPromise();
  }



  // getNewsById(newsId: string, isAuthenticated: boolean) {
  //   if (isAuthenticated) {
  //     return this.http.get<any>('News?newsId=' + newsId);
  //   }
  //   else {
  //     return this.http.get<any>('News/GetNewsDetails?newsId=' + newsId);
  //   }
  // }


}
