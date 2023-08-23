import { IToast } from './../toast.interface';
import { createAction, props } from "@ngrx/store";



export const showError = createAction('[Toast] Toast props been added', props<{ error: IToast }>());
export const removeError = createAction('[Toast] Toast props been removed', props<{ error: IToast }>());
export const noop = createAction('[Toast] No Operation');