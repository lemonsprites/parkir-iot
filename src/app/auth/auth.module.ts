import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoginComponent } from '@App/auth/components/login/login.component';
import { RegisterComponent } from '@App/auth/components/register/register.component';
import { AuthService } from '@App/auth/shared/auth.service';
import { AuthEffects } from '@App/auth/shared/stores/auth.effects';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { AuthRoutes } from './auth.routing';
import { StoreModule } from '@ngrx/store';
import { authReducer } from '@App/auth/shared/stores/auth.reducers';


@NgModule({
    declarations: [RegisterComponent, LoginComponent],
    imports: [CommonModule, ReactiveFormsModule, AuthRoutes, StoreModule.forFeature('auth', authReducer), EffectsModule.forFeature([AuthEffects])],
    providers: [AuthService]
})
export class AuthModule { }
