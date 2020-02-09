import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ErrorDialogService } from '../services/errordialof.sercive';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth/auth.Service';
import { LoginService } from 'src/app/user/services/login.service';
import { NotificationService } from '../services/notification.service';
import { NotificationType } from '../components/notification/notification.component';

@Injectable() export class HttpConfigInterceptor implements HttpInterceptor {
    private refreshTokenInProgress = false;
    // Refresh Token Subject tracks the current token, or is null if no token is currently
    // available (e.g. refresh pending).
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
        null
    );

    constructor(private auth: AuthService, private loginService: LoginService,
        private notificationService: NotificationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {

        let apiUrl = req.url;
        if (
            apiUrl.toLowerCase().indexOf('https://jsonplaceholder.typicode') < 0 &&
            apiUrl.toLowerCase().indexOf('.json') < 0 
        ) {
            apiUrl = `${environment.API_URL}${req.url}`;
        }
        else {
           
            return next.handle(req);
        }

        req = req.clone({
            url: apiUrl,
        });

        var secureReq = null;
        if (req.url.indexOf('token') > 0 ||req.url.indexOf('Account/create') > 0) {
             const baseToken = this.generateBaseAuthorizationToken();
            secureReq = req.clone({
                url: apiUrl,
               // headers: req.headers.set('Authorization', 'Basic ' + baseToken),
                // withCredentials: true
            });
        }
        else {
            const authToken = this.auth.getAuthorizationToken();
            const authTokenType = this.auth.getAuthorizationTokenType();
            if (authToken == "") {
                secureReq = req.clone({
                    url: apiUrl,
                   // withCredentials: true
                });
            }
            else {
                secureReq = req.clone({
                    url: apiUrl,
                    headers: req.headers.set('Authorization', authTokenType + ' ' + authToken),
                   withCredentials: true,
                    
                });
                
            }
        }
        return next.handle(secureReq).pipe(catchError(err => {
            if (err.url && err.url.includes("refreshtoken") && err.status === 401) {
                // this.auth.logout();
                // return throwError((err));
            }
            else if (err.status === 401) {

                var refreshToken = this.auth.getAuthorizationRefreshToken();
                if (refreshToken == "") {
                    // this.auth.logout();
                    // return throwError(err);
                }

               
            }
            else if (err.status === 403) {
                let errorMessage: string;
                if (err.error) {
                    errorMessage = err.error;
                } else {
                    errorMessage = "You are not authorized to access this page";
                }
                this.notificationService.showNotification(errorMessage, NotificationType.Alert);
                return throwError(err);
            }
            
            else {
                return throwError(err);
            }
        }));
    }

    private generateBaseAuthorizationToken(): string {
        return btoa('' + ':' + '');
    }

    public getErrorMessage(err): HttpErrorResponse {
        return err;
    }

    
}

