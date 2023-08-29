import { IUser } from '@App/shared/models/auth.model';
import { Injectable, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, authState } from '@angular/fire/auth';
import { Database, objectVal, ref, set } from '@angular/fire/database';
import { Observable, from } from 'rxjs';

@Injectable()
export class AuthService {
    userData: any
    constructor(private db: Database, private auth: Auth) {

        authState(this.auth).subscribe((user) => {
            if (user) {
                this.userData = user;
                localStorage.setItem('user', JSON.stringify(this.userData));
                JSON.parse(localStorage.getItem('user')!);
            } else {
                localStorage.setItem('user', 'null');
                JSON.parse(localStorage.getItem('user')!);
            }
        });
    }



    authUser = JSON.parse(localStorage.getItem('user'))

    loginFn(email: string, password: string): Observable<UserCredential> {
        // set(ref(this.db, 'users'))
        return from(signInWithEmailAndPassword(this.auth, email, password));
    }

    loginWithGoogleFn(): Observable<UserCredential> {
        return from(signInWithPopup(this.auth, new GoogleAuthProvider()));
    }

    logoutFn(): Observable<void> {
        return from(signOut(this.auth));
    }

    registerFn(email: string, password: string): Observable<UserCredential> {
        return from(createUserWithEmailAndPassword(this.auth, email, password));
    }

    addUser(payload: IUser) {
        console.log(payload)
        set(ref(this.db, `users/${payload.uid}`), payload)
    }

    getCurrentUser(): string {
        // return getAuth().currentUser.uid
        return ''
    }

    getUser(userID: string): Observable<any> {
        return objectVal(ref(this.db, 'users/' + userID));
    }

    get isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem('user')!);
        return user !== null ? true : false;
    }
}
