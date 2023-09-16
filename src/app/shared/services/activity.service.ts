import { Injectable } from '@angular/core';
import { Database, equalTo, limitToLast, listVal, orderByChild, push, query, ref, set } from '@angular/fire/database';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ActivityService {

    query = ref(this.db, 'activity')
    private activity = new Subject<any>();

    constructor(private db: Database) { }

    getAllActivitiesAllUser() {
        return listVal(query(ref(this.db, 'activity'), limitToLast(6)), { keyField: 'key' }).pipe(res => {
            return res
        });
    }

    getActivityCurrentUser() {
        let fnQuery = query(ref(this.db, 'activity'), limitToLast(10), orderByChild('user_id'), equalTo(JSON.parse(localStorage.getItem('user')).uid))
        return listVal(fnQuery, { keyField: 'key' })
    }

    addActivity(metadata: { area_id, booking_id, status, user_id, user_name }) {

        const generatedActivityID = push(ref(this.db, 'activity'))

        // Add Activity Booked ke metadata User
        set(generatedActivityID, {
            area_id: metadata.area_id,
            booking_id: metadata.booking_id,
            status: metadata.status,
            user_id: metadata.user_id,
            user_name: metadata.user_name,
            timestamp: new Date().getTime()
        })

    }
}

