import { Injectable } from '@angular/core';
import { Database, listVal, ref } from '@angular/fire/database';

@Injectable({
    providedIn: 'root'
})
export class ActivityService {

    query = ref(this.db, 'activity')

    constructor(private db: Database) { }

    getAllActivitiesAllUser() {
        return listVal(this.query, { keyField: 'key' }).pipe(res => {
            return res
        });
    }
}

