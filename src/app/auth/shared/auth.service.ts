import { Injectable, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';

@Injectable()
export class AuthService {
    constructor() { }

    userAuth = inject(Auth)

    loginFn(email: string, password: string): Observable<UserCredential> {
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
}
