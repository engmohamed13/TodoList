import { Injectable } from '@angular/core';
import { NewsViewModel, NewsSearchBindingModel, announcementSearchModel } from '../models/news-models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  newsSearch(newsSearchBindingModel: NewsSearchBindingModel, isAuthenticated: boolean) {
    if (isAuthenticated) {
      return this.http.post('News/SearchGatewayNews', newsSearchBindingModel);
    }
    else {
      return this.http.post('News/SearchGeneralNews', newsSearchBindingModel);
    }
  }

  getImageSlider(itemsCount: number, isAuthenticated: boolean) {
    if (isAuthenticated) {
      return this.http.get('ImageSlider/GetGeneralImageSliders/' + itemsCount).toPromise();
    }
    else {
      return this.http.get('ImageSlider/GetGeneralImageSliders/' + itemsCount).toPromise();
    }
  }

  getNewsById(newsId: string, isAuthenticated: boolean) {
    if (isAuthenticated) {
      return this.http.get<any>('News?newsId=' + newsId);
    }
    else {
      return this.http.get<any>('News/GetNewsDetails?newsId=' + newsId);
    }
  }

  searchGeneralAnnouncements(model: announcementSearchModel, isAuthenticated: boolean): Observable<any> {
    if (isAuthenticated) {
      return this.http.post<any>('Announcement/SearchGatewayAnnouncement', model);
    }
    else {
      return this.http.post<any>('Announcement/SearchGeneralAnnouncements', model);
    }
  }
}
