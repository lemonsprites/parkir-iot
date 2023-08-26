import { IArea } from '@App/shared/area.interface';
import { OtpProviderService } from '@App/shared/services/otp-provider.service';
import { Component } from '@angular/core';
import { user, getAuth, Auth } from '@angular/fire/auth';
import { DatabaseInstances, onValue, ref, object, getDatabase, update, set, Database, listVal, objectVal } from '@angular/fire/database';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-add-booking',
    templateUrl: './add-booking.component.html',
    styleUrls: ['./add-booking.component.scss']
})
export class AddBookingComponent {
    areaTerpilih: string = '';
    parkingSpaces: IArea[] = []; // Store parking space data here
    area$: Observable<IArea[]> = listVal<IArea>(ref(this.db, 'Ultrasonic'), { keyField: 'key' })
    area: IArea;
    formBooking: any;
    otpForm: any;
    tempo: number;
    filterargs: {}
    otpString = this.otp.generateOTP();
    bookedVar = ''
    otpVar = ''


    initForm(): void {
        this.formBooking = new FormGroup({
            area: new FormControl('', [Validators.required]),
            otp: new FormControl('', [Validators.required]),
            tempo: new FormControl('', [Validators.required])
        })
    }

    togglePilihan(pilihan: string) {
        this.areaTerpilih = this.areaTerpilih === pilihan ? '' : pilihan;
        objectVal<IArea>(ref(this.db, `Ultrasonic/${pilihan}`), { keyField: 'key' }).subscribe(x => this.area = x)
        console.log(pilihan);

        this.tempo = new Date().getTime() + 60 ** 2 * 1000;

    }

    otp_slot1: any;
    bukaGerbang() {

        // console.log(this.formBooking.controls.otp.value)
        let ID = this.formBooking.controls.otp.value
        // set(ref(this.db[1], '/booking_list/' + ID), ID)
        // console.log(object(ref(this.db[1], '/booking_list')).subscribe())

        // const otp_slot1 = "";
        // onValue(ref(this.db[1], '/Ultrasonic/Slot_A2/otp_1'), (snap) => {
        //     snap.val()
        //     this.otp_slot1 = snap.val()
        //     // setTimeout(() => {
        //     // }, 2000)
        // })
        console.log(ID)

        // const updates = "";

        // updates['entered_otp'] = ID
        update(ref(this.db[1]), { entered_otp: ID.toString() });
        // set(ref(this.db[1], '/entered_otp'), { entered_otp: ID })

        set(ref(this.db[1], 'Opening_Gates'), { Ir_Sensor: 0 })
        set(ref(this.db[1], 'Opening_Gates'), { Ir_Sensor: 1 })
        setTimeout(() => {
            set(ref(this.db[1], 'Opening_Gates'), { Ir_Sensor: 1 })
        }, 5000)
    }

    submitBook() {
        console.log(this.tempo)
        const updates = {};
        // const user_id = user(this.auth).subscribe(x => x.uid)
        updates['/Ultrasonic/' + this.areaTerpilih] = {
            status: 'Booked',
            expired: this.tempo,
            update: new Date().getTime(),
        };

        updates[`/users/bookings/` + this.otpString] = {
            OTP: this.otpString,
            area_id: this.areaTerpilih,
            // user_id: user_id,
            start_time: new Date().getTime(),
            end_time: ''
        }


        updates[`/Ultrasonic/${this.area.nama}/${this.bookedVar}`]
        update(ref(this.db), updates)
        update(ref(this.db, '/Ultrasonic/Slot_A2/'), { otp_2: this.otpString })
        // console.log(object(ref(this.db[1], '/booking_list')).subscribe())
        // this.route.navigate(['user'])


    }

    hitungKeluar() {
        // object()
        // new Date().getTime() + 60 ** 2 * 1000
    }

    bookingSubmit() {
        let user_id = getAuth().currentUser.uid;

        console.log(this.areaTerpilih)
        const updates = {}

        set(ref(this.db, `/bookings/${user_id}/${this.otpString}`), {
            nama: this.area.key,
            user_id: user_id,
            area_id: this.area.key,
            // status: this.area.status,
            timestamp: new Date().getTime()
        })

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
        updates['/Ultrasonic/' + this.areaTerpilih] = {
            nama: this.area.key,
            status: 'Booked',
            expired: this.tempo,
            update: new Date().getTime(),
            [this.otpVar]: this.otpString,
            [this.bookedVar]: 1
        };

        update(ref(this.db), updates)
        this.modal.close()

    }

    constructor(
        private db: Database,
        private auth: Auth,
        private route: Router,
        private otp: OtpProviderService,
        public modal: NgbActiveModal
    ) {
        this.initForm()

        this.area$.subscribe(e => {
            this.parkingSpaces = e
        })
        // console.log(this.areaTerpilih)
        console.log()
    }


}
