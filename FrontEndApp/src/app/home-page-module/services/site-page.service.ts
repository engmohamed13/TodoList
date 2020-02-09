import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SitePageService {


  constructor(private http: HttpClient) { }

  getSitePage(id: string) {
    return this.http.get('SitePage/' + id).pipe();
  }

  getPartners()
  {
    return this.http.get("Partner").pipe();
  }
getBreadcrumbs(sitePageId){
  return this.http.get("SiteMenu/GetBreadCrumb/"+sitePageId).toPromise();
}
getBreadCrumbByMenuId(siteMenuId:string)
{
  return this.http.get("SiteMenu/GetBreadCrumbByMenuId/"+siteMenuId).toPromise();
  
}
}
