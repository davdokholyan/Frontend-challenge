import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { map, Observable } from "rxjs";
import { Store } from "@ngxs/store";
import { Navigate } from "@ngxs/router-plugin";
import { AuthService } from "src/app/services/auth.service";


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
        return this.authService.isAuthenticated().pipe(map((response) => {
            if (response) {
                return true;
            }
            this.store.dispatch(new Navigate(['/']));
            return false;
        }));
    }
}
