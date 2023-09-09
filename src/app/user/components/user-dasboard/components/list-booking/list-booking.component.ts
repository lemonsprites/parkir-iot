import { AuthService } from '@App/auth/shared/auth.service';
import { BookingModel } from '@App/shared/models/booking.model';
import { BookingService } from '@App/shared/services/booking.service';
import { EnterOtpComponent } from '@App/user/components/user-dasboard/components/enter-otp/enter-otp.component';
import { DetailBookingComponent } from '@App/user/components/user-dasboard/components/detail-booking/detail-booking.component';
import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { Database, equalTo, listVal, orderByChild, query, ref } from '@angular/fire/database';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'list-booking',
    templateUrl: './list-booking.component.html',
    styleUrls: ['./list-booking.component.scss'],
    providers: [DatePipe]
})
export class ListBookingComponent implements OnInit, AfterViewInit, OnDestroy {
    bookingList: any[] = [];
    dtTrigger: Subject<any> = new Subject();
    destroyed = new Subject<any>()
    private refreshInterval: any;

    @ViewChild(DataTableDirective, { static: false })
    dtElement: DataTableDirective;

    userDATA = JSON.parse(localStorage.getItem('user'))

    dtOptions: any = {
        pagingType: 'full_numbers',
        serverSide: true,
        autoWidth: false,
        ordering: false,
        search: false,
        searching: false,
        ajax: (dataTablesParameters: any, callback) => {
            const queryData = query(ref(this.db, 'bookings'), orderByChild('user_id'), equalTo(this.userDATA.uid));

            listVal<BookingModel>(queryData, { keyField: 'key' }).pipe(takeUntil(this.destroyed)).subscribe(x => {
                this.bookingList = x.sort((a, b) => b.timestamp - a.timestamp)

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


            const rowData = data as BookingModel;
            // Unbind first in order to avoid any duplicate handler
            $('td', row).off('click');
            $('td', row).on('click', () => {
                this.getBookingDetails(rowData.key); // Use otpKey as the parameter
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
                ngPipeArgs: ['MMM dd, yyyy HH:mm:ss'],
                render: (data: any, type: any, full: any) => {
                    if (full.start_time || full.end_time) {
                        return null;
                    } else {
                        const expiredDate = new Date(full.expired); // Assuming expired is a valid date/time string
                        return this.datePipe.transform(expiredDate, 'MMM dd, yyyy HH:mm:ss');
                    }
                }
            },
            {
                title: 'Time Elapsed', data: 'start_time',
                render: (data: any, type: any, full: any) => {
                    if ((full.start_time && !full.end_time) && (full.status !== 'booked' && full.status !== 'cancelled')) {
                        const creationDate = new Date(full.start_time); // Assuming start_time is a valid date/time string
                        const now = new Date();
                        const elapsedSeconds = Math.floor((now.getTime() - creationDate.getTime()) / 1000);
                        const hours = Math.floor(elapsedSeconds / 3600);
                        const minutes = Math.floor((elapsedSeconds % 3600) / 60);
                        const seconds = elapsedSeconds % 60;
                        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                    } else if (full.end_time) {
                        // If end_time is present, show the difference between start_time and end_time
                        const startDate = new Date(full.start_time);
                        const endDate = new Date(full.end_time);
                        const elapsedSeconds = Math.floor((endDate.getTime() - startDate.getTime()) / 1000);
                        const hours = Math.floor(elapsedSeconds / 3600);
                        const minutes = Math.floor((elapsedSeconds % 3600) / 60);
                        const seconds = elapsedSeconds % 60;
                        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                    } else {
                        return '-';
                    }
                },
                className: 'text-center'
            },
            {
                title: 'Updated At', data: 'timestamp',
                ngPipeInstance: this.datePipe,
                ngPipeArgs: ['MMM dd, yyyy HH:mm:ss']
            },
            {
                title: 'Status',
                render: (data: any, type: any, full: any) => {
                    const now = new Date();
                    const expiredDate = new Date(full.expired); // Assuming expired is a valid date/time string

                    if (full.status == 'cancelled') {
                        return '<span class="badge bg-danger text-white border-none">cancelled</span>';
                    } else if (!full.start_time && now >= expiredDate) {
                        return '<span class="badge bg-danger text-white border-none">expired</span>';
                    } else if (full.start_time && !full.end_time) {
                        return '<span class="badge bg-warning border-none">idle</span>';
                    } else if (full.start_time && full.end_time) {
                        const startDate = new Date(full.start_time);
                        const endDate = new Date(full.end_time);

                        if (now >= startDate && now <= endDate) {
                            return '<span class="badge bg-primary border-none">ongoing</span>';
                        } else if (now > endDate) {
                            return '<span class="badge bg-success border-none">finished</span>';
                        } else {
                            return '<span class="badge bg-warning border-none">idle</span>';
                        }
                    } else {
                        return '<span class="badge bg-primary border-none">booked</span>';
                    }
                },
                className: 'text-center'

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

    ngOnInit(): void {
        this.refreshInterval = setInterval(() => {
            this.updateTimeElapsed(); // Call the function to update time elapsed
        }, 1000);
    }

    ngOnDestroy(): void {
        clearInterval(this.refreshInterval);
        this.destroyed.next('')
        this.destroyed.complete()
    }

    updateTimeElapsed() {
        const now = new Date();
        this.bookingList.forEach(booking => {
            const creationDate = new Date(booking.timestamp); // Assuming timestamp is a valid date/time string
            const elapsedSeconds = Math.floor((now.getTime() - creationDate.getTime()) / 1000);
            booking.timeElapsed = `${Math.floor(elapsedSeconds / 60)}:${elapsedSeconds % 60}`;
        });

        // Trigger DataTable update
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.draw();
        });
    }

    getBookingDetails(booking_id: string) {
        const modalRef = this.modalService.open(DetailBookingComponent);
        modalRef.componentInstance.bookingID = booking_id;
    }

    openEnterOTP() {
        this.modalService.open(EnterOtpComponent);
    }
}
