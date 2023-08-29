import { AuthService } from '@App/auth/shared/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private store: Store, private router: Router, private auth: AuthService) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        if (this.auth.authUser) {
            if (state.url.includes('/user') || state.url.includes('/admin')) {
                return true; // Allow authenticated users to access user and admin areas
            }
            this.router.navigate(['/user/dashboard']); // Redirect to dashboard if logged in and trying to access other areas
            return false;
        } else {
            if (state.url.includes('/user') || state.url.includes('/admin')) {
                this.router.navigate(['/login']); // Redirect to login if not logged in and trying to access user or admin areas
                return false;
            }
            return true; // Allow unauthenticated users to access non-user/admin areas
        }
    }
}