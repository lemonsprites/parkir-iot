import { AuthService } from '@App/auth/shared/auth.service';
import { IArea } from '@App/shared/area.interface';
import { ActivityService } from '@App/shared/services/activity.service';
import { AreaService } from '@App/shared/services/area.services';
import { TransactionsService } from '@App/shared/services/transactions.service';
import { UsersService } from '@App/shared/services/users.service';
import { ToastService } from '@App/toast/toast.service';
import { AddBookingComponent } from '@App/user/components/user-dasboard/components/add-booking/add-booking.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Database, onValue, ref } from '@angular/fire/database';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, map, takeUntil } from 'rxjs';

@Component({
    selector: 'user-dasboard',
    templateUrl: './user-dasboard.component.html',
    styleUrls: ['./user-dasboard.component.scss'],
})
export class UserDasboardComponent implements OnInit, OnDestroy {
    area$ = this.areaService.getAllArea()
    user$ = this.userService.getAllUser()
    trans$ = this.transService.getAllData()
    activity$ = this.activityService.getActivityCurrentUser()

    destroyed = new Subject<any>()

    jmlAreaAll: number;
    jmlAreaLastBooked: number;
    jmlKeuntungan: number;
    jmlUser: number;
    jmlTrans: number;

    area: IArea[];
    activity: Observable<any>;

    bookingPopup() {
        if (this.jmlAreaLastBooked !== 0) {
            const modalRef = this.modalService.open(AddBookingComponent);
            modalRef.componentInstance.parkingSpaces = this.area;
        } else {
            this.toast.showToast('Informasi', 'Lahan untuk reservasi sudah Penuh!\nMohon coba lagi nanti.')
        }
    }

    ngOnInit() {
        this.area$.pipe(takeUntil(this.destroyed)).subscribe(e => {
            let data = e
                .filter(resfilter => resfilter.status !== "Booked" && resfilter.status !== "Fill")
                .map(area => {
                    const timeDifference = new Date(area.expired).getTime() - new Date().getTime();
                    console.log(timeDifference)

                    return {
                        ...area,
                        status: timeDifference >= -3600000 ? 'Booked' : 'Empty'
                    }
                })

            this.area = e.flat()

            this.jmlAreaAll = e.length
            this.jmlAreaLastBooked = data.length
        })
        this.user$.pipe(takeUntil(this.destroyed)).subscribe(e => this.jmlUser = e.length)
        this.jmlKeuntungan = this.transService.total

        onValue(ref(this.db, 'payments'), (snap) => {
            snap.forEach(res => {
                this.jmlKeuntungan += res.val().amount
            })
        })
        this.trans$.pipe(takeUntil(this.destroyed)).subscribe(e => this.jmlTrans = e.length)

        this.activity = this.activity$.pipe(map(
            (data) => {
                data.sort((a: any, b: any) => b.timestamp - a.timestamp);
                return data;
            }), takeUntil(this.destroyed))
    }

    ngOnDestroy(): void {
        this.destroyed.next('');
        this.destroyed.complete();
    }

    constructor(
        private areaService: AreaService,
        private transService: TransactionsService,
        private userService: UsersService,
        private activityService: ActivityService,
        private db: Database,
        private auth: AuthService,
        private authF: Auth,
        private modalService: NgbModal,
        private toast: ToastService
    ) { }


}
