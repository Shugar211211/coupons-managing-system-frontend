import { ClientType } from './../../shared/client-type';
import { AuthService } from './../../shared/services/auth.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class AdminAuthGuard implements CanActivate {
    
    constructor(
                private authService: AuthService,
                private router: Router
                ) {}
    
    canActivate(
                route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot
                ): Observable<boolean> | Promise<boolean> | boolean {
        if(this.authService.getClientRole() == ClientType.ADMINISTRATOR) {
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