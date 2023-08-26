import { ActivityModel } from '@App/shared/models/activity.model.ts';
import { Injectable } from '@angular/core';
import { Database, listVal, objectVal, ref } from '@angular/fire/database';
import { Observable, forkJoin, map, switchMap } from 'rxjs';

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

