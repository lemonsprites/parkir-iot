import { Component } from '@angular/core';

@Component({
    selector: 'user-akun',
    templateUrl: './user-akun.component.html',
    styleUrls: ['./user-akun.component.scss'],
})
export class UserAkunComponent {
    user = JSON.parse(localStorage.getItem('user'))

    constructor() {
        console.log(this.user);

    }

}
