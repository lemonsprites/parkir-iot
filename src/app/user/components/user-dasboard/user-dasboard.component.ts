import { AuthService } from '@App/auth/shared/auth.service';
import { IArea } from '@App/shared/area.interface';
import { AreaAddComponent } from '@App/shared/components/area-add/area-add.component';
import { AreaService } from '@App/shared/services/area.services';
import { TransactionsService } from '@App/shared/services/transactions.service';
import { UsersService } from '@App/shared/services/users.service';
import { ToastService } from '@App/toast/toast.service';
import { AddBookingComponent } from '@App/user/components/user-dasboard/components/add-booking/add-booking.component';
import { Component, OnInit } from '@angular/core';
import { Auth, getAuth } from '@angular/fire/auth';
import { Database, onValue, ref } from '@angular/fire/database';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { take, takeUntil } from 'rxjs';

@Component({
    selector: 'user-dasboard',
    templateUrl: './user-dasboard.component.html',
    styleUrls: ['./user-dasboard.component.scss'],
})
export class UserDasboardComponent implements OnInit {
    area$ = this.areaService.getAllArea()
    user$ = this.userService.getAllUser()
    trans$ = this.transService.getAllData()

    jmlAreaAll: number;
    jmlAreaLastBooked: number;
    jmlKeuntungan: number;
    jmlUser: number;
    jmlTrans: number;

    area: IArea[];

    bookingPopup() {
        if (this.jmlAreaLastBooked !== 0) {
            const modalRef = this.modalService.open(AddBookingComponent);
            modalRef.componentInstance.parkingSpaces = this.area;
        } else {
            this.toast.showToast('Informasi', 'Lahan untuk reservasi sudah Penuh!\nMohon coba lagi nanti.')
        }
    }

    getUserID(): string {
        let user_id = getAuth().currentUser.uid;
        return user_id;
    }

    ngOnInit() {
        this.area$.subscribe(e => {
            let data = e.map(area => {
                const timeDifference = new Date(area.update).getTime() - new Date().getTime();
                console.log(timeDifference)

                return {
                    ...area,
                    status: timeDifference >= -3600000 ? 'Booked' : 'Empty'
                }
            }).filter(resfilter => resfilter.status !== "Booked" && resfilter.status !== "Fill")
            this.jmlAreaAll = e.length
            this.jmlAreaLastBooked = data.length
        })
        this.user$.subscribe(e => this.jmlUser = e.length)
        this.jmlKeuntungan = this.transService.total

        onValue(ref(this.db, 'payments'), (snap) => {
            snap.forEach(res => {
                this.jmlKeuntungan += res.val().amount
            })
        })
        this.trans$.subscribe(e => this.jmlTrans = e.length)

        this.area$.subscribe(e => {
            this.area = e.map(area => {
                const timeDifference = new Date(area.update).getTime() - new Date().getTime();

                return {
                    ...area,
                    status: timeDifference >= -3600000 ? 'Booked' : 'Empty'
                }
            }).flat()
        });
    }

    constructor(
        private areaService: AreaService,
        private transService: TransactionsService,
        private userService: UsersService,
        private db: Database,
        private auth: AuthService,
        private authF: Auth,
        private modalService: NgbModal,
        private toast: ToastService
    ) { }


}
