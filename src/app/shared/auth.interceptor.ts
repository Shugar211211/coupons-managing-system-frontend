import { AlertService } from './services/alert.service';
import { AuthService } from './services/auth.service';
import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    // timeout flag
    time = null

    constructor(
                private authService: AuthService,
                private router: Router,
                private alertService: AlertService
                ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if(this.authService.isAuthenticated()) {
            req = req.clone({ headers: req.headers.set('Authorization',`Bearer ${sessionStorage.getItem('jbcp-token')}`)})
        }
        return next.handle(req)
            .pipe(
                // tap( () => {console.log('Request intercepted') } ),
                tap( (event) => {
                    if(event.type === HttpEventType.Response) {
                        if(this.time) { 
                            clearTimeout(this.time) 
                        }
                        console.log('Reset logout timeout')
                        this.time = setTimeout( () => {
                                    console.log('now should call logout() method')
                                    this.authService.logout()
                                }, 1000*60*30)
                    }
                } ),
                catchError( (error: HttpErrorResponse) => {
                    if(error.status === 401) {
                        console.log('Error 401: ', error)
                        this.authService.logout()
                        this.router.navigate(['/'], {queryParams: {authFailed: true}})
                    }

                    // if(error.status === 400) {
                    //     console.log('Error 400: ', error.error.message)
                    //     // this.alertService.danger(error.error.message)
                    //     this.router.navigate(['/error'])
                    // }

                    if(error.status === 404) {
                        console.log('Error 404: ', error.error.message)
                        this.router.navigate(['/error'])
                    }

                    return throwError(error)
                })
            )
    }
}