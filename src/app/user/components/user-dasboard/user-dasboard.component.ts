import { AuthService } from '@App/auth/shared/auth.service';
import { IArea } from '@App/shared/area.interface';
import { AreaAddComponent } from '@App/shared/components/area-add/area-add.component';
import { BookingModel } from '@App/shared/models/booking.model';
import { AreaService } from '@App/shared/services/area.services';
import { TransactionsService } from '@App/shared/services/transactions.service';
import { UsersService } from '@App/shared/services/users.service';
import { AddBookingComponent } from '@App/user/components/add-booking/add-booking.component';
import { DetailBookingComponent } from '@App/user/components/detail-booking/detail-booking.component';
import { EnterOtpComponent } from '@App/user/components/enter-otp/enter-otp.component';
import { Component } from '@angular/core';
import { Auth, getAuth, user } from '@angular/fire/auth';
import { Database, DatabaseInstances, list, listVal, objectVal, onValue, orderByChild, query, ref } from '@angular/fire/database';
import { getDatabase } from '@firebase/database';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { from, map } from 'rxjs';

@Component({
    selector: 'user-dasboard',
    templateUrl: './user-dasboard.component.html',
    styleUrls: ['./user-dasboard.component.scss'],
})
export class UserDasboardComponent {
    area$ = this.areaService.getAllArea()
    user$ = this.userService.getAllUser()
    trans$ = this.transService.getAllData()

    jmlAreaAll: number;
    jmlAreaLastBooked: number;
    jmlKeuntungan: number;
    jmlUser: number;
    jmlTrans: number;

    area: IArea[];

    // bookingsUser: any[];

    bookingList: any[]

    open() {
        const modalRef = this.modalService.open(AreaAddComponent);
        modalRef.componentInstance.name = 'World';
    }

    bookingPopup() {
        const modalRef = this.modalService.open(AddBookingComponent);
    }

    getBookingDetails(booking_id: number) {
        const modalRef = this.modalService.open(DetailBookingComponent);
        modalRef.componentInstance.bookingID = booking_id;

    }

    openEnterOTP() {
        const modalRef = this.modalService.open(EnterOtpComponent);
        // modalRef.componentInstance.bookingID = booking_id;

    }

    constructor(
        private areaService: AreaService,
        private transService: TransactionsService,
        private userService: UsersService,
        private db: Database,
        private auth: AuthService,
        private authF: Auth,
        private modalService: NgbModal
    ) {
        // user()
        let UID: string = this.auth.getCurrentUser()


        // console.log(UID)

        this.area$.subscribe(e => {
            let data = e.filter(resfilter => resfilter.status !== "Booked")
            this.jmlAreaAll = e.length
            this.jmlAreaLastBooked = data.length
        })
        this.user$.subscribe(e => this.jmlUser = e.length)
        this.jmlKeuntungan = this.transService.total

        onValue(ref(this.db, 'payments'), (snap) => {
            // console.log(snap);

            snap.forEach(res => {
                this.jmlKeuntungan += res.val().amount
            })
        })
        this.trans$.subscribe(e => this.jmlTrans = e.length)

        this.area$.subscribe(e => this.area = e.flat());

        list(ref(this.db, `bookings/${UID}`)).subscribe((event: any) => {

            this.bookingList = Object.entries(event[0].snapshot.val()).map(([key, value]: any) => ({
                key: key,
                displayName: getAuth().currentUser.displayName,
                ...value
            }));
            // Now the bookingList array contains the desired structure
            console.log(this.bookingList);

        })



    }


}
