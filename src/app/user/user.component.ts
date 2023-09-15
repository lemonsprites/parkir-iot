import { AuthService } from '@App/auth/shared/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent {
    constructor(private authService: AuthService, private route: Router) {
        if(this.authService.getUserRole !== 'user') {
            this.route.navigate(['/admin'])
        }

    }
}
