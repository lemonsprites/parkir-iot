import { BookingModel } from '@App/shared/models/booking.model';
import { Component, Input, OnInit } from '@angular/core';
import { Auth, getAuth } from '@angular/fire/auth';
import { Database, objectVal, ref } from '@angular/fire/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
    selector: 'app-detail-booking',
    templateUrl: './detail-booking.component.html',
    styleUrls: ['./detail-booking.component.scss']
})
export class DetailBookingComponent implements OnInit {
    formEnterOTP;
    @Input() bookingID;

    bookingData: BookingModel = null;
    initForm(): void {
        this.formEnterOTP = new FormGroup({
            area: new FormControl('', [Validators.required]),
            otp: new FormControl('', [Validators.required]),
            tempo: new FormControl('', [Validators.required])
        })
    }

    ngOnInit(): void {

        console.log(this.bookingID)

        objectVal<BookingModel>(ref(this.db, `bookings/${this.bookingID}`), { keyField: 'key' }).subscribe((e: BookingModel) => {
            this.bookingData = e
            this.formEnterOTP.patchValue({
                area: e.nama,
                tempo: new Date(e.timestamp).toLocaleString(),
            });
        })

    }

    copyToClipboard(otpCode: string) {
        this.clipboard.copy(otpCode)
        this.modal.close()
    }


    constructor(
        private db: Database,
        public modal: NgbActiveModal,
        private auth: Auth,
        private clipboard: Clipboard
    ) {
        this.initForm()

    }


}
