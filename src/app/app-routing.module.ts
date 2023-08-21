import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/components/register/register.component';
import { UserRoutes } from './user/user.routing';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthRoutes } from './auth/auth.routing';
import { AdminRoutes } from './admin/admin.routing';
import { TestComponent } from './test/test.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/login' },
    { path: 'test', component: TestComponent }
    // { path: '/**', component: NotFoundComponent}


];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
