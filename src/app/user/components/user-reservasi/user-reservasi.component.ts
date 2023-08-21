import { IArea } from '@App/shared/area.interface';
import { Component } from '@angular/core';
import { getAuth, user } from '@angular/fire/auth';
import { DatabaseInstances, getDatabase, object, onValue, ref, set, update } from '@angular/fire/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'user-reservasi',
    templateUrl: './user-reservasi.component.html',
    styleUrls: ['./user-reservasi.component.scss']
})
export class UserReservasiComponent {

    areaTerpilih: string = '';
    parkingSpaces: IArea[] = []; // Store parking space data here
    area: IArea;
    formBooking: any;
    otpForm: any;
    tempo: number;
    filterargs: {}

    constructor(private db: DatabaseInstances, private route: Router) {
        this.initForm()
        this.loadParkingSpaces()





    }

    initForm(): void {
        this.formBooking = new FormGroup({
            area: new FormControl('', [Validators.required]),
            otp: new FormControl('', [Validators.required]),
            tempo: new FormControl('', [Validators.required])
        })
    }


    loadParkingSpaces() {
        onValue(ref(this.db[0], '/area'), (snap) => {
            let temp = []
            snap.forEach(e => {
                // console.log(e.key, this.areaTerpilih)
                temp.push({ key: e.key, ...e.val() })
                this.parkingSpaces = temp
                // this.parkingSpaces = temp.filter(x => x.status !== 'booking')
            })
            console.log(this.parkingSpaces)
        })
        // console.log(this.parkingSpaces);

        // .snapshotChanges().subscribe((spaces: any[]) => {
        //     this.parkingSpaces = spaces;
        //     // console.log(this.parkingSpaces)
        // });
    }

    togglePilihan(pilihan: string) {
        this.areaTerpilih = this.areaTerpilih === pilihan ? '' : pilihan;
        object(ref(getDatabase(), `area/${pilihan}`)).subscribe(x => this.area = x.snapshot.val())
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
        const user_id = user(getAuth()).subscribe(x => x.uid)
        updates['/area/' + this.areaTerpilih] = {
            nama: this.area.nama,
            status: 'booking',
            expired: this.tempo,
            update: new Date().getTime(),
        };
        var digits = '0123456789';
        let ID = '';
        for (let i = 0; i < 6; i++) {
            ID += digits[Math.floor(Math.random() * 10)];
        }
        updates['/users/aB0F66qpkidkdH27UNnhwOtC3k02/bookings/' + ID] = {
            OTP: ID,
            area_id: this.areaTerpilih,
            start_time: new Date().getTime(),
            hasOpen: false,
            end_time: ''
        }
        update(ref(this.db[0]), updates)
        update(ref(this.db[1], '/Ultrasonic/Slot_A2/'), { otp_2: ID })
        console.log(object(ref(this.db[1], '/booking_list')).subscribe())
        // this.route.navigate(['user'])


    }

    hitungKeluar() {
        // object()
        // new Date().getTime() + 60 ** 2 * 1000
    }



}
