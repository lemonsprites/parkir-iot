import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { AdminRoutes } from './admin.routing';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminKelolaUserComponent } from './components/admin-kelola-user/admin-kelola-user.component';
import { AdminProfilComponent } from './components/admin-profil/admin-profil.component';
import { AdminRiwayatTransaksiComponent } from './components/admin-riwayat-transaksi/admin-riwayat-transaksi.component';
import { AdminHeaderComponent } from './components/layouts/admin-header/admin-header.component';
import { AdminSidebarComponent } from './components/layouts/admin-sidebar/admin-sidebar.component';
import { AdminBillingComponent } from './components/admin-billing/admin-billing.component';
import { AdminLayananComponent } from './components/admin-layanan/admin-layanan.component';
import { AreaAddComponent } from '@App/shared/components/area-add/area-add.component';
import { AdminActivityComponent } from './components/admin-dashboard/components/admin-activity/admin-activity.component';
import { TimeAgo } from '@App/shared/time-ago.service';



@NgModule({
    declarations: [AdminComponent, AdminDashboardComponent, AdminHeaderComponent, AdminSidebarComponent, AdminProfilComponent, AdminKelolaUserComponent, AdminRiwayatTransaksiComponent, AdminBillingComponent, AdminLayananComponent, AdminActivityComponent],
    imports: [CommonModule, AdminRoutes, AreaAddComponent],
    providers: [TimeAgo]
})
export class AdminModule { }
