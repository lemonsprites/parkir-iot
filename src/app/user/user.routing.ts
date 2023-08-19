import { RouterModule, Routes } from '@angular/router';
import { InfoDukunganComponent } from './components/info-dukungan/info-dukungan.component';
import { UserDasboardComponent } from './components/user-dasboard/user-dasboard.component';
import { UserComponent } from './user.component';
import { UserReservasiComponent } from './components/user-reservasi/user-reservasi.component';
import { AreaMonitorComponent } from './components/area-monitor/area-monitor.component';
import { UserAkunComponent } from './components/user-akun/user-akun.component';

const routes: Routes = [
    {
        path: 'user',
        component: UserComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'dashboard',
            },
            { path: 'dashboard', component: UserDasboardComponent },
            { path: 'reservasi', component: UserReservasiComponent },
            { path: 'area-monitor', component: AreaMonitorComponent },
            { path: 'akun', component: UserAkunComponent },
            { path: 'layanan-dukungan', component: InfoDukunganComponent }
        ],

    },
];

export const UserRoutes = RouterModule.forChild(routes);
