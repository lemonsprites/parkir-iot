import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './admin.component';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
import { AdminAkunComponent } from './components/admin-akun/admin-akun.component';



@NgModule({
    declarations: [AdminComponent, AdminDashboardComponent, AdminHeaderComponent, AdminSidebarComponent, AdminAkunComponent],
    imports: [CommonModule, RouterModule]
})
export class AdminModule { }
