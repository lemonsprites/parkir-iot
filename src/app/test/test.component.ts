import { map } from 'rxjs';
import { IArea } from '@App/shared/area.interface';
import { Component } from '@angular/core';
import { DatabaseInstances, getDatabase, list, listVal, object, objectVal, ref, set, update } from '@angular/fire/database';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss'],
})
export class TestComponent {

    /**
     * Init Declaration
     */
    db_1 = this.db[0];
    db_2 = this.db[1];

    area$ = listVal<IArea>(ref(this.db_1, 'area'), { keyField: 'key' })
    areaList: IArea[] = [];
    areaTerpilih: string = '';
    currentArea: IArea;
    expiredTime: number = 0


    constructor(private db: DatabaseInstances) {
        this.area$.subscribe(x => { this.areaList = x })
    }


    createOTP(): string {
        var digits = '0123456789';
        let ID = '';
        for (let i = 0; i < 6; i++) {
            ID += digits[Math.floor(Math.random() * 10)];
        }
        return ID;
    }

    setExpiredTime(durasi: number = 1): number {
        let konversiJam = new Date().getTime() + 60 ** 2 * 1000
        return durasi ? konversiJam * durasi : konversiJam
    }

    /**
     * Booking Test Logic
    *
    */

    formBooking: any = new FormGroup({
        area: new FormControl('', [Validators.required]),
        tempo: new FormControl('', [Validators.required])
    })

    togglePilihan(pilihan: string) {
        this.areaTerpilih = this.areaTerpilih === pilihan ? '' : pilihan;

        if (pilihan !== '') {
            objectVal<IArea>(ref(this.db_1, `area/${pilihan}`), { keyField: 'key' }).subscribe(x => { this.currentArea = x })
            this.expiredTime = this.setExpiredTime(2);
        } else {
            alert('Pilih Area yang lainnya!')
        }
    }

    submitBook() {
        /**
         * Prosedur Logic
         * 1. Set Kode OTP
         * 2. Update Area Status Booking dan Expired
         * 3. Add Booking List baru di User
         * 4. Assign OTP di Slot Sensor
         */

        let otp = this.createOTP()
        let uid = 'aB0F66qpkidkdH27UNnhwOtC3k02';

        // Updating Area Status dan Expired
        const updates = {};
        updates['/area/' + this.areaTerpilih] = {
            status: 'booking',
            expired: this.expiredTime,
            update: new Date().getTime(),
        };

        // Add Booking List Baru di User
        updates[`/users/${uid}/bookings/` + otp] = {
            OTP: otp,
            area_id: this.areaTerpilih,
            start_time: new Date().getTime(),
            hasOpen: false,
            end_time: ''
        }
        update(ref(this.db[0]), updates)

        // Set OTP di Slot Sensor
        update(ref(this.db[1], '/Ultrasonic/Slot_A2/'), { otp_2: otp })
        // console.log(object(ref(this.db[1], '/booking_list')).subscribe())
    }

    /**
     * Send OTP Logic
     */
    formOTP: any = new FormGroup({
        kodeOTP: new FormControl('', [Validators.required]),
        otpControl: new FormControl('', [Validators.required])
    })



    bukaGerbang() {

        // console.log(this.formBooking.controls.otp.value)
        // let ID = this.formBooking.controls.otp.value
        // set(ref(this.db[1], '/booking_list/' + ID), ID)
        // console.log(object(ref(this.db[1], '/booking_list')).subscribe())

        // const otp_slot1 = "";
        // onValue(ref(this.db[1], '/Ultrasonic/Slot_A2/otp_1'), (snap) => {
        //     snap.val()
        //     this.otp_slot1 = snap.val()
        //     // setTimeout(() => {
        //     // }, 2000)
        // })
        // console.log(ID)

        // const updates = "";

        // updates['entered_otp'] = ID
        // update(ref(this.db[1]), { entered_otp: ID.toString() });
        // set(ref(this.db[1], '/entered_otp'), { entered_otp: ID })

        // console.log()
        if (this.formOTP.controls.otpControl.value !== '') {
            set(ref(this.db_2, 'Opening_Gates'), { Ir_Sensor: 0 })
            setTimeout(() => {
                set(ref(this.db_2, 'Opening_Gates'), { Ir_Sensor: 1 })
            }, 5000)
        } else {
            alert('pilih slot terlebih dahulu')
        }

    }

}
