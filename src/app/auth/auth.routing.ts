import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
];

export const AuthRoutes = RouterModule.forChild(routes);
