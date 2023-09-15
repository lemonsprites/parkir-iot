import { AuthService } from '@App/auth/shared/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthService) { }

    canActivate(): boolean {
        if (this.authService.isLoggedIn) {
            const allowedRoles = ['admin', 'user']; // Define the allowed roles here

            // Check if the user's role is in the allowedRoles array
            const userRole = this.authService.getUserRole; // Adjust this to your actual role retrieval method

            if (allowedRoles.includes(userRole)) {
                // User has one of the allowed roles, allow access
                return true;
            }
            if (userRole == 'admin') { this.router.navigate(['admin']) };
            if (userRole == 'user') { this.router.navigate(['user']) };

        }

        // User is not authenticated or does not have one of the allowed roles, redirect to login or another page
        this.router.navigate(['/login']); // Adjust the path as needed
        return false;
    }
}
