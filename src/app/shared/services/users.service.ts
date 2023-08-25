import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Database, list, listVal, ref, set, push } from '@angular/fire/database';
import { IUser } from '@App/shared/models/auth.model';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    readonly query = ref(this.db, 'users')

    getAllUser(): Observable<IUser[]> {
        return listVal(this.query, { keyField: 'key' })
    }

    addUser() {
        // return push(this.query, {
        //     displayName: "Dara Muda",
        //     email: 'mohantyankit619@gmail.com',
        //     emailVerified: true,
        //     photoURL: "https://lh3.googleusercontent.com/a/AAcHTtd14K7lrAJ609jxoUxDt0cAqyKHwRuLGfz3LpVWKfTRRWY=s96-c",
        //     uid: "aB0F66qpkidkdH27UNnhwOtC3k02"
        // })

        // aB0F66qpkidkdH27UNnhwOtC3k02

        return list
    }
    constructor(private db: Database) { }

}
