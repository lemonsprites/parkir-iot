import { IArea } from '@App/shared/area.interface';
import { AreaAddComponent } from '@App/shared/components/area-add/area-add.component';
import { AreaService } from '@App/shared/services/area.services';
import { TransactionsService } from '@App/shared/services/transactions.service';
import { UsersService } from '@App/shared/services/users.service';
import { Component } from '@angular/core';
import { Database, onValue, ref } from '@angular/fire/database';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
    selector: 'admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.scss']
})

export class AdminDashboardComponent {

    area$ = this.areaService.getAllArea()
    user$ = this.userService.getAllUser()
    trans$ = this.transService.getAllData()

    jmlArea: number;
    jmlKeuntungan: number;
    jmlUser: number;
    jmlTrans: number;

    area: IArea[];



    constructor(
        private areaService: AreaService,
        private transService: TransactionsService,
        private userService: UsersService,
        private db: Database,
        private modalService: NgbModal
    ) {
        this.area$.subscribe(e => this.jmlArea = e.length)
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


    open() {
        const modalRef = this.modalService.open(AreaAddComponent);
        modalRef.componentInstance.name = 'World';
    }

}
