import { ToastService } from '@App/toast/toast.service';
import { Component, OnInit } from '@angular/core';
import { Auth, User, UserInfo, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent implements OnInit{
    sidebarToggle: boolean = false

    userData: any;
    togglingSidebar() {
        this.sidebarToggle = !this.sidebarToggle;
    }

    newStatus(set : boolean) {
        this.sidebarToggle = set;
    }

    ngOnInit() {

        this.userData = JSON.parse(localStorage.getItem('user'))
        // console.log(this.userData);
    }


    logoutFn() {
        signOut(this.auth).then(() => {
            localStorage.removeItem('user')
            this.toast.showToast('Informasi', 'Anda berhasil logout dari aplikasi.')
            this.route.navigate(['login'])
        })
    }

    constructor(
        private auth: Auth,
        private toast: ToastService,
        private route: Router
    ) {  }

}
