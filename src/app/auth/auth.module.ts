import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterComponent } from '@App/auth/components/register/register.component';
import { LoginComponent } from '@App/auth/components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from '@App/not-found/not-found.component';

const authRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', component: NotFoundComponent}

];

@NgModule({
    declarations: [RegisterComponent, LoginComponent,],
    imports: [CommonModule, RouterModule.forChild(authRoutes), ReactiveFormsModule]
})
export class AuthModule { }
