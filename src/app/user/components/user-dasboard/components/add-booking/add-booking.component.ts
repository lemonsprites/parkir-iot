import { IArea } from '@App/shared/area.interface';
import { BookingModel } from '@App/shared/models/booking.model';
import { BookingService } from '@App/shared/services/booking.service';
import { OtpProviderService } from '@App/shared/services/otp-provider.service';
import { ToastService } from '@App/toast/toast.service';
import { Component, Input, OnDestroy } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Database, listVal, objectVal, orderByChild, push, query, ref, set, update } from '@angular/fire/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-add-booking',
    templateUrl: './add-booking.component.html',
    styleUrls: ['./add-booking.component.scss']
})
export class AddBookingComponent implements OnDestroy {
    areaTerpilih: string = '';
    @Input() parkingSpaces: IArea[] = []; // Store parking space data here
    area: IArea;
    formBooking: any;
    otpForm: any;
    tempo: number;
    otpString = this.otp.generateOTP();
    bookedVar = ''
    otpVar = ''


    initForm(): void {
        this.formBooking = new FormGroup({
            area: new FormControl('', [Validators.required]),
            tempo: new FormControl('', [Validators.required])
        })
    }

    togglePilihan(pilihan: string) {
        const selectedSpace = this.parkingSpaces.find(space => space.key === pilihan);

        if (selectedSpace && selectedSpace.status !== 'Booked') {
            this.areaTerpilih = this.areaTerpilih === pilihan ? '' : pilihan;
            objectVal<IArea>(ref(this.db, `Ultrasonic/${pilihan}`), { keyField: 'key' }).subscribe(x => this.area = x);
            this.tempo = new Date().getTime() + 60 ** 2 * 1000;
        } else if (selectedSpace && selectedSpace.status === 'Booked') {
            this.toast.showToast('Informasi', 'Lahan sudah direservasi');
        }
    }


    bookingSubmit() {
        let user = JSON.parse(localStorage.getItem('user'));

        const updates = {}
        const generateNewID = push(ref(this.db, 'bookings'));

        // Push Data Booking Baru
        // status: this.area.status,
        set(generateNewID, {
            otpKey: this.otpString,
            nama: this.area.key,
            user_id: user.uid,
            status: 'booked',
            expired: this.tempo,
            area_id: this.area.key,
            timestamp: new Date().getTime()
        });

        // Filter Variabel yang dipake
        switch (this.area.nama) {
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

        // Update data slot yang dipilih buat booking
        updates['/Ultrasonic/' + this.areaTerpilih] = {
            nama: this.area.key,
            status: 'Booked',
            update: new Date().getTime(),
            [this.otpVar]: this.otpString,
            [this.bookedVar]: 1
        };

        // Commit ke database
        update(ref(this.db), updates)

        this.bookingService.updateList();
        this.modal.close()

    }

    ngOnDestroy(): void {
        const queryData = query(ref(this.db, 'bookings'), orderByChild('timestamp'));
        listVal<BookingModel>(queryData, { keyField: 'key' }).subscribe(x => {

            // console.log(x.length)
            x.sort((a, b) => b.timestamp - a.timestamp);

        });
    }

    constructor(
        private db: Database,
        private auth: Auth,
        private route: Router,
        private otp: OtpProviderService,
        public modal: NgbActiveModal,
        private bookingService: BookingService,
        private toast: ToastService
    ) {
        this.initForm()

    }


}
