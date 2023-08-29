import { AuthService } from '@App/auth/shared/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthService) { }

    canActivate(): boolean {
        if (!this.authService.isLoggedIn) {
            // User is not authenticated, redirect to login page
            this.router.navigate(['/login']); // Adjust the path to your login page
            return false;
        }
        return true;
    }
}