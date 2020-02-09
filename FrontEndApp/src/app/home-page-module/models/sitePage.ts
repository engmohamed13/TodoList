export class SitePageDetailsViewModel {
    breadCrumb: BreadCrumbViewModel[];
    sitePageId: string;
    titleAr: string;
    titleEn: string;
    bodyAr: string;
    bodyEn: string;
    imageId: string;
    imageUrl: string;
    bannerImageId: string;
    bannerImageUrl: string;
    creationDate: string;
    creationDateDateFormated: string;
    lastUpdateDate: string;
    lastUpdateDateFormated: string;
    isPublished: boolean;
}


export class BreadCrumbViewModel {
    titleAr: string;
    titleEn: string;
    sitePageId: string;
}
