import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastService } from './toast/toast.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent  {
    title = 'parkir-iot';

    constructor(private store: Store) { }

    toast = inject(ToastService)


    add() {
        this.toast.showToast('Alert', 'pesan')
    }
}
