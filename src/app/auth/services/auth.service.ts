import { IUser } from 'src/app/shared/models/IUser';
import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, from, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private fAuth: Auth) {}

    login(email: string, password: string): Observable<IUser> {
        return from(
            signInWithEmailAndPassword(this.fAuth, email, password)
        ).pipe(
            map((user) => ({
                uid: user.user.uid,
                email: user.user.email,
                displayName: user.user.displayName,
                photoURL: user.user.photoURL,
                roles: ['user']
            }))
        );
    }

    logout(): Observable<void> {
        return from(this.fAuth.signOut());
    }
}
