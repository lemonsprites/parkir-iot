import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment.prod';
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
        provideFirebaseApp(() => initializeApp(environment.firebase2, 'dbYoseph')),
        provideAuth(() => getAuth()),
        provideDatabase(() => getDatabase()),
        provideDatabase(() => getDatabase(getApp('dbYoseph'))),
        provideFirestore(() => getFirestore()),

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
    exports: [FormsModule,ReactiveFormsModule, NotFoundComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
