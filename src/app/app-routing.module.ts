import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/components/register/register.component';
import { AdminRoutingRoutes } from './admin/admin.routing';
import { UserRoutes } from './user/user.routing';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/login' },

];

@NgModule({
    imports: [RouterModule.forRoot(routes), UserRoutes, AdminRoutingRoutes],
    exports: [RouterModule]
})
export class AppRoutingModule { }
