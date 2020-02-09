import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RootSiteMenuViewModel } from '../models/mega-menu-model';


@Injectable({
  providedIn: 'root'
})
export class MenuService {

  obj:RootSiteMenuViewModel;
  child:string;
  parentid:string;
  @Output() activeItemChanged: EventEmitter<any> = new EventEmitter();  

  constructor(private http: HttpClient) { }
  getMenuItems() {
    return this.http.get('SiteMenu/').toPromise();
  }
}
