import { Injectable } from '@angular/core';
import { Database, listVal, orderByChild, query, ref } from '@angular/fire/database';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BookingService {
    readonly queryDefault = ref(this.db, 'bookings');

    getUserBooking(userID: string) {
        let queryData = query(ref(this.db, 'bookings'), orderByChild("timestamp"))
        listVal(queryData).subscribe
    }

    private updateSubject = new Subject<void>();

    updateList() {
        this.updateSubject.next();
    }

    get update$() {
        return this.updateSubject.asObservable();
    }

    constructor(private db: Database) { }

}
