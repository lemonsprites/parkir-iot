import { removeError, showError } from '@App/toast/stores/toast.action';
import { selectToastErrors, toastState } from '@App/toast/stores/toast.reducer';
import { IToast } from '@App/toast/toast.interface';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    constructor(private store: Store<toastState>) {

    }

    showToast(title: string, body: string, time?: number): void {

        let toast = {
            title: title,
            message: body,
            time: time || new Date().getTime()
        };

        this.store.dispatch(showError({ error: toast }));

        setTimeout(() => {
            this.removeToast(toast);
        }, 5000);
    }

    removeToast(toast: IToast): void {
        this.store.dispatch(removeError({ error: toast }));
    }
}
