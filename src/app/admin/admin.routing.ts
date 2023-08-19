import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './admin.component';
import { AdminAkunComponent } from './components/admin-akun/admin-akun.component';

const routes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
            {
                path: 'dashboard',
                component: AdminDashboardComponent
            },
            {
                path: 'akun',
                component: AdminAkunComponent
            },
        ]
    }
];

export const AdminRoutingRoutes = RouterModule.forChild(routes);
