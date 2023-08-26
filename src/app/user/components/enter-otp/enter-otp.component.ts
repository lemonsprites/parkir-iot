import { Component, OnInit } from '@angular/core';
import { Database, ref, set, update } from '@angular/fire/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-enter-otp',
    templateUrl: './enter-otp.component.html',
    styleUrls: ['./enter-otp.component.scss']
})
export class EnterOtpComponent implements OnInit {
    formEnterOTP;

    ngOnInit(): void {
        this.formEnterOTP = new FormGroup({
            otp: new FormControl('', [Validators.required])
        })
    }


    otpSubmit() {
        // let updates = {};
        let ID = this.formEnterOTP.controls.otp.value
        console.log(ID)
        update(ref(this.db), { entered_otp: ID.toString() });
        // set(ref(this.db[1], '/entered_otp'), { entered_otp: ID })

        set(ref(this.db, 'Entering_Gates'), { Ir_Enter: 0 })
        // set(ref(this.db[1], 'Opening_Gates'), { Ir_Sensor: 1 })
        setTimeout(() => {
            set(ref(this.db, 'Entering_Gates'), { Ir_Enter: 1 })
        }, 5000)


        this.modal.close()



    }


    constructor(private modal: NgbActiveModal, private db: Database) { }




}
