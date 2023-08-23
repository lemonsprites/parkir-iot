import { TimeAgo } from '@App/shared/time-ago.service';
import { selectToastErrors, toastState } from '@App/toast/stores/toast.reducer';
import { IToast } from '@App/toast/toast.interface';
import { ToastService } from '@App/toast/toast.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss'],
    animations: [
        trigger('fadeInOut', [
            state('void', style({ opacity: 0 })),
            state('*', style({ opacity: 1 })),
            transition(':enter', animate('200ms ease-in')),
            transition(':leave', animate('200ms ease-out'))
        ])
    ]
})
export class ToastComponent {

    constructor(private handler: ToastService, private timeConvert: TimeAgo, private store: Store<toastState>) {
        this.store.select(selectToastErrors).subscribe(e => {
            this.messages = e.flat()
        })
    }

    messages: IToast[];


    hideToast(toast: IToast): void {
        this.handler.removeToast(toast);
    }

    time(time: number): string {
        return this.timeConvert.timeAgo(time);
    }


}
