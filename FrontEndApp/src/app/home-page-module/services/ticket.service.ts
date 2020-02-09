import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, empty } from 'rxjs';
import { UserProfile } from '../models/userProfile-model';
import { map, tap, catchError } from 'rxjs/operators';



@Injectable({ providedIn: 'root' })
export class TicketService {

    constructor(private http: HttpClient) { }
    // create(model: EndUserTicketBindingModel) {
    //     return this.http.post('Ticket', model).toPromise();
    // }

    createAnonymous(model:any) {
        return this.http.post('Ticket/CreateAnonymousTicket', model).toPromise();
    }

    uploadTempAttachment(file: FormData) {
        return this.http.post('Ticket/UploadTempAttachment', file).toPromise();
    }
    getAllProfiles(): Observable<UserProfile[]> {
        return this.http.get<UserProfile[]>('Profile/ListAllProfiles')
            .pipe(
                map(data => {
                    return data;
                }),
                tap(),
                catchError((err, catchError) => {
                    console.log(err);
                    return empty()
                })
            );
    }
}

