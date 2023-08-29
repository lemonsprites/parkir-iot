import { ToastService } from '@App/toast/toast.service';
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

                    let slotOTP = '';
                    let otpInput = '';
                    get(ref(this.db, `Ultrasonic/${areaData.area_id}/${this.otpVar}`))
                        .then(e => {
                            slotOTP = e.val();

                            // Fetch otpInput after fetching slotOTP
                            return get(ref(this.db, 'entered_otp'));
                        })
                        .then(e => {
                            otpInput = e.val();

                            if (areaData.expired >= new Date().getTime()) {
                                // Compare OTP values
                                if (slotOTP === otpInput) {
                                    // Your logic here when OTPs match
                                    update(child(ref(this.db, 'bookings'), areaKey), { status: 'Fill', timestamp: new Date().getTime(), start_time: new Date().getTime() });

                                    setTimeout(() => {
                                        update(child(ref(this.db, 'Ultrasonic'), areaData.area_id), {
                                            [this.otpVar]: "",
                                            update: new Date().getTime()
                                        });
                                    }, 10000);


                                    set(ref(this.db, 'Entering_Gates'), { Ir_Enter: 0 })
                                    setTimeout(() => {
                                        set(ref(this.db, 'Entering_Gates'), { Ir_Enter: 1 })
                                    }, 5000)


                                    // Add Activity
                                } else {
                                    this.toast.showToast('Peringatan!','Kode OTP tidak valid.')
                                }
                            } else {
                                this.toast.showToast('Peringatan!','OTP dan Data reservasi sudah tidak berlaku')
                            }

                        })
                        .catch(error => {
                            this.toast.showToast('Peringatan!','Gagal mengambil Data.')
                        });

                });
            } else {
                this.toast.showToast('Peringatan!','Gagal mengambil Data.')
            }
        });


        this.modal.close()



    }


    constructor(private modal: NgbActiveModal, private db: Database, private toast: ToastService) { }




}
