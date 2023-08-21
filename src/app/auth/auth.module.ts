import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoginComponent } from '@App/auth/components/login/login.component';
import { RegisterComponent } from '@App/auth/components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthRoutes } from './auth.routing';


@NgModule({
    declarations: [RegisterComponent, LoginComponent],
    imports: [CommonModule, ReactiveFormsModule, AuthRoutes, EffectsModule.forFeature([])],
})
export class AuthModule { }
