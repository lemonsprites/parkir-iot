import { Observable } from 'rxjs';
import { IArea } from '@App/shared/area.interface';
import { Injectable } from '@angular/core';
import { Database, listVal, ref } from '@angular/fire/database';


@Injectable({
    providedIn: 'root'
})
export class AreaService {

    constructor(
        private db: Database
    ) { }

    getAllArea(): Observable<IArea[]> {
        return listVal(ref(this.db, 'area'), { keyField: 'key' })
    }
}