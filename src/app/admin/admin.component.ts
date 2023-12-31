import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
    constructor(private route: Router) {
        if (JSON.parse(localStorage.getItem('user')).role !== 'admin') {
            this.route.navigate(['user'])
        }
    }

}
