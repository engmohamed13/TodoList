import { staticSitePageEnum } from './static-site-page-enum';

export class RootSiteMenuViewModel {
  childSiteMenus: SiteMenuViewModel[];
  siteMenuId: string;
  titleEn: string;
  parentMenuId: string;
  readOnly: boolean = true;
  parentMenuTitle: string
  sitePageId: string;
  sitePageTitle: string
  order: number;
  creationDate: string;
  creationDateDateFormated: string;
  lastUpdateDate: string;
  lastUpdateDateFormated: string;
  isPublished: boolean;
  staticSitePage	:staticSitePageEnum;
  staticSitePageName:string;
}

export class SiteMenuViewModel {
  siteMenuId: string;
  titleAr: string;
  titleEn: string;
  parentMenuId: string;
  readOnly: boolean = true
  parentMenuTitle: string;
  sitePageId: string;
  sitePageTitle: string;
  order: number;
  creationDate: string;
  creationDateDateFormated: string;
  lastUpdateDate: string;
  lastUpdateDateFormated: string;
  isPublished: boolean;
}