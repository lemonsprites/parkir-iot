import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminProfilComponent } from './components/admin-profil/admin-profil.component';
import { AdminKelolaUserComponent } from './components/admin-kelola-user/admin-kelola-user.component';
import { AdminRiwayatTransaksiComponent } from './components/admin-riwayat-transaksi/admin-riwayat-transaksi.component';
import { AdminBillingComponent } from './components/admin-billing/admin-billing.component';
import { AdminLayananComponent } from './components/admin-layanan/admin-layanan.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
            {
                path: 'profil',
                component: AdminProfilComponent
            },
            {
                path: 'dashboard',
                component: AdminDashboardComponent
            },
            {
                path: 'kelola-user',
                component: AdminKelolaUserComponent
            },
            {
                path: 'riwayat-transaksi',
                component: AdminRiwayatTransaksiComponent
            },
            {
                path: 'billing',
                component: AdminBillingComponent
            },
            {
                path: 'pelayanan',
                component: AdminLayananComponent
            },
        ]
    }
];

export const AdminRoutes = RouterModule.forChild(routes);
