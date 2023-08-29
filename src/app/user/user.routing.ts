import { RouterModule, Routes } from '@angular/router';
import { AreaMonitorComponent } from './components/area-monitor/area-monitor.component';
import { InfoDukunganComponent } from './components/info-dukungan/info-dukungan.component';
import { UserAkunComponent } from './components/user-akun/user-akun.component';
import { UserDasboardComponent } from './components/user-dasboard/user-dasboard.component';
import { UserComponent } from './user.component';

const routes: Routes = [
    {
        path: '',
        component: UserComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: UserDasboardComponent },
            { path: 'area-monitor', component: AreaMonitorComponent },
            { path: 'akun', component: UserAkunComponent },
            { path: 'layanan-dukungan', component: InfoDukunganComponent }
        ],

    },
];

export const UserRoutes = RouterModule.forChild(routes);
