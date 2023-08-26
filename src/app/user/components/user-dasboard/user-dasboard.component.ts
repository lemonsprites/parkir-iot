import { IArea } from '@App/shared/area.interface';
import { AreaAddComponent } from '@App/shared/components/area-add/area-add.component';
import { AreaService } from '@App/shared/services/area.services';
import { TransactionsService } from '@App/shared/services/transactions.service';
import { UsersService } from '@App/shared/services/users.service';
import { AddBookingComponent } from '@App/user/components/add-booking/add-booking.component';
import { Component } from '@angular/core';
import { Database, DatabaseInstances, list, onValue, ref } from '@angular/fire/database';
import { getDatabase } from '@firebase/database';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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





    open() {
        const modalRef = this.modalService.open(AreaAddComponent);
        modalRef.componentInstance.name = 'World';
    }

    bookingPopup() {
        const modalRef = this.modalService.open(AddBookingComponent)
    }

    constructor(
        private areaService: AreaService,
        private transService: TransactionsService,
        private userService: UsersService,
        private db: Database,
        private modalService: NgbModal
    ) {
        this.area$.subscribe(e => {
            let data = e.filter(resfilter => resfilter.status !== "Booked")
            this.jmlAreaAll = e.length
            this.jmlAreaLastBooked = data.length
            // console.log(this.jmlArea)
        })
        this.user$.subscribe(e => this.jmlUser = e.length)
        this.jmlKeuntungan = this.transService.total
        // console.log(this.jmlKeuntungan);
        onValue(ref(this.db, 'payments'), (snap) => {
            // console.log(snap);

            snap.forEach(res => {
                this.jmlKeuntungan += res.val().amount
            })
        })
        this.trans$.subscribe(e => this.jmlTrans = e.length)

        this.area$.subscribe(e => this.area = e.flat());


    }


}
