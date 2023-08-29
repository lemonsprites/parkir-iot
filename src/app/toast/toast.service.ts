import { removeError, showError } from '@App/toast/stores/toast.action';
import { selectToastErrors, toastState } from '@App/toast/stores/toast.reducer';
import { IToast } from '@App/toast/toast.interface';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Store } from '@ngrx/store';

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    constructor(private store: Store<toastState>, private sanitizer: DomSanitizer) {

    }

    showToast(title: string, body: any, time?: number): void {
        const safeHtml: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(body)
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
