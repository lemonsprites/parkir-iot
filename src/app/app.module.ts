import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { toastReducer } from './toast/stores/toast.reducer';

import { TimeAgo } from '@App/shared/time-ago.service';
import { ToastEffects } from '@App/toast/stores/toast.effect';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
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
import { TestComponent } from './test/test.component';
import { ToastComponent } from './toast/toast.component';
import { UserModule } from './user/user.module';
import { DataTablesModule } from 'angular-datatables';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { FeedbackModule } from '@App/feedback/feedback.module';

@NgModule({
    declarations: [AppComponent, NotFoundComponent, TestComponent, ToastComponent],
    imports: [
        // Angular Module
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        NgbModule,
        DataTablesModule,
        ClipboardModule,

        // Firebase Module
        provideFirebaseApp(() => initializeApp(environment.firebase)),
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

        // NgRX Module
        StoreModule.forRoot({ 'toast': toastReducer }, {}),
        EffectsModule.forRoot([ToastEffects]),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),

        // Development Module
        AuthModule,
        AdminModule,
        UserModule,
        FeedbackModule

    ],
    providers: [TimeAgo],
    exports: [FormsModule, ReactiveFormsModule, NotFoundComponent, DataTablesModule, ClipboardModule],
    bootstrap: [AppComponent]
})
export class AppModule { }
