import { BookingModel } from '@App/shared/models/booking.model';
import { Component, Input, OnInit } from '@angular/core';
import { Auth, getAuth } from '@angular/fire/auth';
import { Database, objectVal, ref } from '@angular/fire/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-detail-booking',
    templateUrl: './detail-booking.component.html',
    styleUrls: ['./detail-booking.component.scss']
})
export class DetailBookingComponent implements OnInit {
    formEnterOTP;
    @Input() bookingID;

    bookingData: BookingModel
    initForm(): void {
        this.formEnterOTP = new FormGroup({
            area: new FormControl('', [Validators.required]),
            otp: new FormControl('', [Validators.required]),
            tempo: new FormControl('', [Validators.required])
        })
    }

    ngOnInit(): void {
        console.log(this.bookingID)
        let UID = getAuth().currentUser.uid

        console.log(UID)

        objectVal<BookingModel>(ref(this.db, `bookings/${UID}/${this.bookingID}`), { keyField: 'key' }).subscribe((e: BookingModel) => {
            this.bookingData = e
            this.formEnterOTP.patchValue({
                area: e.nama,
                tempo: new Date(e.timestamp).toLocaleString(),
                otp: e.key
            });
        })

    }

    constructor(
        private db: Database,
        public modal: NgbActiveModal,
        private auth: Auth
    ) {
        this.initForm()

    }


}
