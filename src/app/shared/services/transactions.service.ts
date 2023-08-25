import { Injectable } from '@angular/core';
import { Database, equalTo, list, listVal, onValue, query, ref } from '@angular/fire/database';

@Injectable({
    providedIn: 'root'
})
export class TransactionsService {

    readonly query = ref(this.db, 'payments')
    total: number = 0

    getAllData() {
        return listVal(this.query, { keyField: 'key' })

    }

    constructor(
        private db: Database
    ) {}
}
