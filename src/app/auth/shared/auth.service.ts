import { IUser } from '@App/shared/models/auth.model';
import { Injectable, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from '@angular/fire/auth';
import { Database, ref, set } from '@angular/fire/database';
import { Observable, from } from 'rxjs';

@Injectable()
export class AuthService {
    constructor() { }

    userAuth = inject(Auth)
    db = inject(Database)

    loginFn(email: string, password: string): Observable<UserCredential> {
        // set(ref(this.db, 'users'))
        return from(signInWithEmailAndPassword(this.userAuth, email, password));
    }

    loginWithGoogleFn(): Observable<UserCredential> {
        return from(signInWithPopup(this.userAuth, new GoogleAuthProvider()));
    }

    logoutFn(): Observable<void> {
        return from(signOut(this.userAuth));
    }

    registerFn(email: string, password: string): Observable<UserCredential> {
        return from(createUserWithEmailAndPassword(this.userAuth, email, password));
    }

    addUser(payload: IUser) {
        console.log(payload)
        set(ref(this.db, `users/${payload.uid}`), payload)
    }
}
