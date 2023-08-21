import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth';
import { connectDatabaseEmulator, getDatabase, provideDatabase } from '@angular/fire/database';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserModule } from './user/user.module';
import { Router } from '@angular/router';
import { TestComponent } from './test/test.component';

@NgModule({
    declarations: [AppComponent, NotFoundComponent, TestComponent],
    imports: [
        // Angular Module
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        NgbModule,

        // Firebase Module
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        // provideFirebaseApp(() => initializeApp(environment.firebase2, 'sensor')),
        provideAuth(() => {
            let auth = getAuth();
            if (environment.production == false && environment.emulator.useEmulators == true) {
                connectAuthEmulator(auth, environment.emulator.authHost)
            }
            return auth;
        }),
        provideDatabase(() => {
            let database = getDatabase()
            if (environment.production == false && environment.emulator.useEmulators == true) {
                connectDatabaseEmulator(database, environment.emulator.databaseHost, environment.emulator.databasePort)
            }
            return database;
        }),
        // provideDatabase(() => getDatabase(getApp('sensor'))),

        // NgRX Module
        StoreModule.forRoot({}, {}),
        EffectsModule.forRoot([]),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),

        // Development Module
        AuthModule,
        AdminModule,
        UserModule,
    ],
    providers: [],
    exports: [FormsModule, ReactiveFormsModule, NotFoundComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
