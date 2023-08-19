import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth';
import { connectDatabaseEmulator, getDatabase, provideDatabase } from '@angular/fire/database';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
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
import { UserModule } from './user/user.module';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
    declarations: [AppComponent, NotFoundComponent],
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
            const auth = getAuth()
            if (environment.useEmulators) {
                connectAuthEmulator(auth, 'http://127.0.0.1:8080');
                return auth;
            }
            return auth;
        }),
        provideDatabase(() => {
            const database = getDatabase();
            if (environment.useEmulators) {
                connectDatabaseEmulator(database, '127.0.0.1', 9000)
                return database;
            }
            return database;
        }),
        // provideDatabase(() => {
        //     const database2 = getDatabase(getApp('sensor'))
        //     if (environment.useEmulators) {
        //         connectDatabaseEmulator(database2, 'http://127.0.0.1', 9001)
        //         return database2;
        //     }
        //     return database2;
        // }),
        // provideFirestore(() => getFirestore()),

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
