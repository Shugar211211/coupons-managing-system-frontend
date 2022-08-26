import { AuthService } from './../../shared/services/auth.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from 'rxjs';
import { ClientType } from 'src/app/shared/client-type';
import { Injectable } from '@angular/core';

@Injectable()
export class CompanyAuthGuard implements CanActivate{
    
    constructor(
                private authService: AuthService,
                private router: Router
                ) {}
    
    canActivate(
                route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot
                ): Observable<boolean> | Promise<boolean> | boolean {
        if(this.authService.getClientRole() == ClientType.COMPANY) {
            return true
        }
        else {
            this.authService.logout()
            this.router.navigate(['/'], {queryParams:{authStatus: false}, 
                                        queryParamsHandling: 'merge', 
                                        skipLocationChange: true
                                        })
        }
    }
}