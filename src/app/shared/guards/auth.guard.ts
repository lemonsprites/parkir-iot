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
      // User is authenticated, prevent navigation to login or register
      this.router.navigate(['/user/dashboard']); // Redirect to a suitable page for logged-in users
      return false;
    }
    return true
  }
}