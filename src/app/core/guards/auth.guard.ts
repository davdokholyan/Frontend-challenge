import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";

import { Observable } from "rxjs";

import { Store } from "@ngxs/store";
import { Navigate } from "@ngxs/router-plugin";

import { AuthService } from "src/app/core/services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private store: Store
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
         if(this.authService.isAuthenticated()) {
             return true;
           } else {
           this.store.dispatch(new Navigate(['/']));
           return false;
         }
    }
}
