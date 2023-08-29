import { AuthService } from '@App/auth/shared/auth.service';
import { BookingModel } from '@App/shared/models/booking.model';
import { BookingService } from '@App/shared/services/booking.service';
import { EnterOtpComponent } from '@App/user/components/user-dasboard/components/enter-otp/enter-otp.component';
import { DetailBookingComponent } from '@App/user/components/user-dasboard/components/detail-booking/detail-booking.component';
import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { Database, listVal, orderByChild, query, ref } from '@angular/fire/database';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
    selector: 'list-booking',
    templateUrl: './list-booking.component.html',
    styleUrls: ['./list-booking.component.scss'],
    providers: [DatePipe]
})
export class ListBookingComponent implements OnInit, AfterViewInit {
    bookingList: BookingModel[] = [];
    dtTrigger: Subject<any> = new Subject();

    @ViewChild(DataTableDirective, { static: false })
    dtElement: DataTableDirective;


    dtOptions: any = {
        pagingType: 'full_numbers',
        serverSide: true,
        autoWidth: false,
        ordering: false,
        search: false,
        searching: false,
        ajax: (dataTablesParameters: any, callback) => {
            const queryData = query(ref(this.db, 'bookings'), orderByChild('timestamp'));

            listVal<BookingModel>(queryData, { keyField: 'key' }).subscribe(x => {
                let userDATA = JSON.parse(localStorage.getItem('user'))
                this.bookingList = x.filter(user => user.user_id === userDATA.uid).sort((a, b) => b.timestamp - a.timestamp)

                const recordsTotal = this.bookingList.length;
                const recordsFiltered = this.bookingList.length;
                callback({
                    recordsTotal,
                    recordsFiltered,
                    data: this.bookingList
                });
            });
        },
        rowCallback: (row: Node, data: any[] | object, dataIndex: number) => {
            row.childNodes[0].textContent = String(dataIndex + 1);

            const self = this;
            const rowData = data as BookingModel;
            // Unbind first in order to avoid any duplicate handler
            $('td', row).off('click');
            $('td', row).on('click', () => {
                self.getBookingDetails(rowData.key); // Use otpKey as the parameter
            });
            return row;
        },
        columns: [
            { title: 'ID', data: 'key' },
            // { title: 'User ID', data: 'user_id' },
            { title: 'Area ID', data: 'area_id' },
            {
                title: 'Nama', data: 'user_id',
                render: (data, type, row) => {
                    let user = JSON.parse(localStorage.getItem('user'))
                    if (user.uid === data) {
                        // console.log(user.displayName);

                        return user.displayName === '' || user.displayName === null ? user.email : user.displayName
                    } else {
                        return '(Tanpa Nama)'
                    }
                }
            },
            {
                title: 'Expired', data: 'expired',
                ngPipeInstance: this.datePipe,
                ngPipeArgs: ['MMM dd, yyyy HH:mm:ss']
            },
            {
                title: 'Updated At', data: 'timestamp',
                ngPipeInstance: this.datePipe,
                ngPipeArgs: ['MMM dd, yyyy HH:mm:ss']
            },
            {
                title: 'Status',
                render: (data: any, type: any, full: any) => {
                    let className = '';
                    let statusName = ''
                    if (full.expired <= new Date().getTime() && full.status !== 'Fill') {
                        className = 'bg-danger text-white'
                        statusName = 'expired'
                    } else if (full.status == 'Fill' && full.expired <= new Date().getTime()) {
                        className = 'bg-success';
                        statusName = 'finished'
                    } else {
                        className = 'bg-primary';
                        statusName = 'booked'
                    }
                    return `<span class="badge ${className} border-none"">${statusName}</span>`;
                }

            }
        ],
        dom: 'Btip',
        buttons: [
            'copy',
            'print',
            'excel',
            {
                text: 'Kirim OTP',
                key: '1',
                action: (e, dt, node, config) => {
                    this.openEnterOTP()
                }
            }
        ],
        pageLength: 10,
        processing: true,
    };

    constructor(
        private db: Database,
        private modalService: NgbModal,
        private bookingService: BookingService,
        private datePipe: DatePipe,
        private auth: AuthService
    ) {
        this.bookingService.update$.subscribe(() => {
            this.refreshData();
        })
    }
    refreshData() {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            // Destroy the table first
            dtInstance.destroy();
            // this.dtTrigger.unsubscribe()
            // Call the dtTrigger to rerender again
            this.dtTrigger.next('');
        });
    }

    ngAfterViewInit(): void {
        this.dtTrigger.next('');
    }

    ngOnInit(): void { }

    getBookingDetails(booking_id: string) {
        const modalRef = this.modalService.open(DetailBookingComponent);
        modalRef.componentInstance.bookingID = booking_id;
    }

    openEnterOTP() {
        this.modalService.open(EnterOtpComponent);
    }
}
