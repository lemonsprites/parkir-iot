import { IArea } from '@App/shared/models/IArea';
import { Component, OnInit } from '@angular/core';
import { Database, DatabaseInstances, getDatabase, list, object, ref } from '@angular/fire/database';
import { onValue } from '@firebase/database';
import { Observable, Subscription } from 'rxjs';

@Component({
    selector: 'admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

    area$ = list(ref(getDatabase(),'area'))
    user$ = list(ref(getDatabase(),'users'))

    jmlArea: any;
    jmlUser: any;

    constructor() {}

    ngOnInit(): void {
        this.area$.subscribe( e => { this.jmlArea = e.length })
        this.user$.subscribe( e => { this.jmlUser = e.length })

    }


}
