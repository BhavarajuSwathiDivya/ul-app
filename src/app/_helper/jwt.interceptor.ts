import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpHeaders,HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../auth/auth.service';

@Injectable(
    
)
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //add authorization header with jwt token if available
        let currentUser = this.authenticationService.currentUserValue;
        if (currentUser && currentUser.token) {
            request = request.clone({
                headers: new HttpHeaders({
                    Authorization: `Bearer ${currentUser.token}`
                })
                // setHeaders: {
                //     Authorization: `Bearer ${currentUser.token}`
                // }
            });
        }

        return next.handle(request);
    }
}