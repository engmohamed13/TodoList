export class NewsSearchBindingModel {
    searchText: string;
    sortDirection: "descending";
    sortBy: "date";
    pageSize: number;
    pageIndex: number;
}

export enum SortDirection {
    Ascending,
    Descending
}

export enum SortBy {
    TitleAr,
    TitleEn,
    NewsDate,
    LastUpdateDate,
    date
}
// *************************************************************

export class NewsSearchViewModel {
    totalNews: number;
    news: NewsViewModel[];
}

export class NewsViewModel {
    newsId: string;
    newsDate: string;
    newsDateFormated: string;
    titleAr: string;
    titleEn: string;
    bodyAr: string;
    bodyEn: string;
    imageId: string;
    imageUrl: string;
    lastUpdateDate: string;
    lastUpdateDateFormated: string;
    isPublished: boolean;
    newsGateways: string[];
    dateFormated: any;
    dateFormatedArabic:string;
    dateFormatedEnglish	:string;
    active:boolean;
}


export class ImageSliderViewMode{
    imageSliderId: string;
    titleAr: string;
    titleEn: string;
    descriptionAr: string;
    descriptionEn: string;
    backgroundImageId: string;
    backgroundImageUrl: string;
    titleImageId: string;
    titleImageUrl: string;
    navigationTitleAr: string;
    navigationTitleEn: string;
    navigationUrlAr: string;
    navigationUrlEn: string;
    lastUpdateDate: string;
    lastUpdateDateFormated: string;
    isPublished: true;
    gateways:string[]= []
    
  }
  export class announcementSearchModel {
    searchText: string = "";
    sortDirection:string= "Ascending";
    sortBy:string= "TitleAr";
    pageSize: number = 20;
    pageIndex: number = 0;
}

export class announcementBodyModel {
    totalAnnouncements: number;
    announcements: announcements[] = [];
}

export class announcements {
    announcementId: string;
    date: string;
    dateFormated: string;
    titleAr: string;
    titleEn: string;
    bodyAr: string;
    bodyEn: string;
    lastUpdateDate: string
    lastUpdateDateFormated: string
    isPublished: true
    gateways: string[]
    active:boolean=false;
    tooltipAr:string;
    tooltipEn:string;

}
