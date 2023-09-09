import { BookingModel } from '@App/shared/models/booking.model';
import { Component, Input, OnInit } from '@angular/core';
import { Auth, getAuth } from '@angular/fire/auth';
import { Database, get, objectVal, ref, update } from '@angular/fire/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Clipboard } from '@angular/cdk/clipboard';
import { ToastService } from '@App/toast/toast.service';

@Component({
    selector: 'app-detail-booking',
    templateUrl: './detail-booking.component.html',
    styleUrls: ['./detail-booking.component.scss']
})
export class DetailBookingComponent implements OnInit {
    formEnterOTP;
    @Input() bookingID;

    bookingData: any = null;
    initForm(): void {
        this.formEnterOTP = new FormGroup({
            area: new FormControl('', [Validators.required]),
            otp: new FormControl('', [Validators.required]),
            tempo: new FormControl('', [Validators.required])
        })
    }

    ngOnInit(): void {
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


    bookedVar: string = '';
    otpVar: string = ''
    cancelBooking(id: string) {
        get(ref(this.db, 'bookings/' + id)).then((snap) => {
            const areaKey = snap.key;
            const areaData = snap.val();

            console.log(areaData);

            switch (areaData.area_id) {
                case 'Slot_A1':
                    this.bookedVar = 'booked_1';
                    this.otpVar = 'otp_1';
                    break;
                case 'Slot_A2':
                    this.bookedVar = 'booked_2';
                    this.otpVar = 'otp_2';
                    break;

                default:
                    this.bookedVar = 'booked_1';
                    this.otpVar = 'otp_1';
                    break;
            }

            const confirmed = window.confirm('Apakah anda yakin akan membatalkan reservasi?');

            if (confirmed) {
                update(ref(this.db, `Ultrasonic/${areaData.area_id}`), {
                    [this.otpVar]: "",
                    status: "Empty",
                    update: new Date().getTime(),
                })
                update(ref(this.db, `bookings/${id}`), {
                    status: "cancelled",
                    timestamp: new Date().getTime(),
                })
                this.toast.showToast('Informasi', `Reservasi dengan kode area #${areaData.area_id} dibatalkan`)
                this.modal.close()

            } else {
                this.modal.close()
            }
        })
    }


    constructor(
        private db: Database,
        public modal: NgbActiveModal,
        private auth: Auth,
        private clipboard: Clipboard,
        private toast: ToastService
    ) {
        this.initForm()

    }


}
