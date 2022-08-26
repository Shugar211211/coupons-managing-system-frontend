import { ClientData } from './../interfaces/client-data';
import { ClientType } from './../client-type';
// import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthResponse } from './../interfaces/auth-response';
import { environment } from './../../../environments/environment';
import { Client } from './../interfaces/client';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';


@Injectable()
export class AuthService {

    private readonly apiUrl = `${environment.apiUrl}/api/authenticate`

    public error$: Subject<string> = new Subject<string>()

    private clientData: ClientData

    constructor(private http: HttpClient) {
    }

    get token(): string {
        return sessionStorage.getItem('jbcp-token')
    }

    login(client: Client): Observable<any>{
        return this.http.post(this.apiUrl, client)
            .pipe(
                tap(this.setToken),
                catchError(this.handleError.bind(this))
            )
    }

    logout() {
        this.setToken(null)
    }

    isAuthenticated(): boolean {
        return !!this.token
    }

    getClientRole(): ClientType | null{
        if(this.isAuthenticated()) {
            if(sessionStorage.getItem('role') == 'ADMINISTRATOR') { return ClientType.ADMINISTRATOR }
            else if(sessionStorage.getItem('role') == 'COMPANY') { return ClientType.COMPANY }
            else if(sessionStorage.getItem('role') == 'CUSTOMER') { return ClientType.CUSTOMER }
            else { return null }
        }
        else {
            return null
        }
    }

    private handleError(errorResponse: HttpErrorResponse) {
        const clientMessage = errorResponse.error.message
        console.log('errorResponse: ', clientMessage)

        // if(clientMessage == 'Wrong email or password') {
        //     this.error$.next(clientMessage)
        // }

        this.error$.next(clientMessage)

        return throwError(errorResponse)
    }

    private setToken(response: AuthResponse | null) {
        // var obj = JSON.parse(response);
        if(response) {
            this.clientData = jwt_decode(response.token)
            sessionStorage.setItem('jbcp-token', response.token)
            sessionStorage.setItem('role', this.clientData.role)
            sessionStorage.setItem('id', this.clientData.id)
            sessionStorage.setItem('name', this.clientData.name)
        }
        else {
            sessionStorage.clear()
        }
    }
}