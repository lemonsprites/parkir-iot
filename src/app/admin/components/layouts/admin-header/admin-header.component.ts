import { ToastService } from '@App/toast/toast.service';
import { Component, OnInit } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
    selector: 'admin-header',
    templateUrl: './admin-header.component.html',
    styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {
    constructor(private auth: Auth, private toast: ToastService, private route: Router) { }
    sidebarToggle: boolean = false

    userData: any

    ngOnInit(): void {
        this.userData = JSON.parse(localStorage.getItem('user'))
    }


    togglingSidebar() {
        this.sidebarToggle = !this.sidebarToggle;
        console.log(this.sidebarToggle)
    }

    newStatus(set: boolean) {
        this.sidebarToggle = set;
    }

    logoutFn() {
        signOut(this.auth).then(() => {
            localStorage.removeItem('user')
            this.toast.showToast('Informasi', 'Anda berhasil logout dari aplikasi.')
            this.route.navigate(['login'])
        })
    }

}
