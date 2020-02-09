export class EventsSearchBindingModel {
    searchText: string;
    sortDirection: string="descending";
    sortBy: string="date";
    pageSize: number = 20;
    pageIndex: number = 0;
}
// export enum SortDirection {
//     Ascending,
//     Descending
// }

// export enum SortBy {
//     Number,
//     TitleAr,
//     TitleEn,
//     NewsDate,
//     LastUpdateDate,
//     CreationDate
// }

export class TotalSiteEventSearchViewModel{
    totalSiteEvents: number;
    siteEvents:	SiteEventViewModel[];
}
   export class SiteEventViewModel{
    siteEventId: string;
    number:	number;
    titleAr: string;
    titleEn: string;
    bodyAr:	string
    bodyEn:	string
    imageId:	string;
    eventDate:	string
    eventTimeFrom:	string
    eventTimeTo:	string
    imageUrl:	string
    bannerImageId:	string;
    bannerImageUrl:	string
    creationDate:	string
    creationDateDateFormated:	string
    lastUpdateDate:	string
    lastUpdateDateFormated:	string
    isPublished:	boolean
    venue:	VenueViewModel
    }
    export class VenueViewModel{
        venueId	:string;
        number:	number;
        nameAr:	string;
        nameEn:	string;
        locationId:	string;
        averageCapacity	:number;
        floor:	number;
        isActive:	boolean;
        locationNumber:	number;
        locationName:	string;
    }
    
