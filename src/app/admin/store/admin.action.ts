import { IArea } from "@App/shared/area.interface";
import { createAction, props } from "@ngrx/store";



export enum adminActionTypes {
    ADMIN_GET_AREA = "[Admin Page] Get Area",
    ADMIN_LOAD_AREA = "[Admin Page] Area loaded",
    ADMIN_ERROR = "[Admin Page] Area Error",
}


export const adminInit = createAction(adminActionTypes.ADMIN_GET_AREA)
export const adminError = createAction(adminActionTypes.ADMIN_ERROR, props<{ error: string }>())
export const adminLoadAllArea = createAction(adminActionTypes.ADMIN_LOAD_AREA, props<{ area: IArea[] }>())