import { Component, OnInit } from '@angular/core';
import { Database, child, equalTo, get, orderByChild, query, ref, set, update } from '@angular/fire/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-enter-otp',
    templateUrl: './enter-otp.component.html',
    styleUrls: ['./enter-otp.component.scss']
})
export class EnterOtpComponent implements OnInit {
    formEnterOTP;
    bookedVar = ''
    otpVar = ''

    ngOnInit(): void {
        this.formEnterOTP = new FormGroup({
            otp: new FormControl('', [Validators.required])
        })
    }


    otpSubmit() {
        // let updates = {};
        let ID = this.formEnterOTP.controls.otp.value
        // console.log(ID)
        update(ref(this.db), { entered_otp: ID.toString() });



        const queryRef = query(ref(this.db, 'bookings'), orderByChild('otpKey'), equalTo(ID));

        // Fetch the data based on the query
        // The returned snapshot will contain the filtered areas
        // You can then iterate through the snapshot's children to access the matching areas
        get(queryRef).then(snapshot => {
            if (snapshot.exists()) {
                snapshot.forEach(childSnapshot => {
                    const areaKey = childSnapshot.key;
                    const areaData = childSnapshot.val();

                    // Update the status to 'occupied'
                    console.log(areaData.area_id);
                    update(child(ref(this.db, 'bookings'), areaKey), { status: 'Fill', timestamp: new Date().getTime(), start_time: new Date().getTime() });

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
                    setTimeout(() => {
                        update(child(ref(this.db, 'Ultrasonic'), areaData.area_id), {
                            [this.otpVar]: "",
                            update: new Date().getTime()
                        });

                    }, 10000)

                    // Add Activity
                    
                });
            } else {
                console.log('No matching areas found.');
            }
        });


        set(ref(this.db, 'Entering_Gates'), { Ir_Enter: 0 })
        setTimeout(() => {
            set(ref(this.db, 'Entering_Gates'), { Ir_Enter: 1 })
        }, 5000)


        this.modal.close()



    }


    constructor(private modal: NgbActiveModal, private db: Database) { }




}
