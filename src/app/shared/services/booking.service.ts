import { Injectable } from '@angular/core';
import { Database, listVal, query, ref } from '@angular/fire/database';

@Injectable({
    providedIn: 'root'
})
export class BookingService {
    readonly query = ref(this.db, 'bookings');

    getUserBooking(userID: string) {
        listVal(ref(this.db, 'bookings/'))
    }

    constructor(private db: Database) { }

}
