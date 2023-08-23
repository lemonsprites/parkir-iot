import { removeError, showError, noop } from "@App/toast/stores/toast.action";
import { IToast } from "@App/toast/toast.interface";
import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";

export interface toastState {
    errors: IToast[]
}

const toastInitialState: toastState = {
    errors: []
}

const selectToastState = createFeatureSelector<toastState>('toast');
export const selectToastErrors = createSelector(
    selectToastState,
    (state: toastState) => state.errors
);


export const toastReducer = createReducer(
    toastInitialState,
    on(showError, (state, { error }) => {
        return {
            ...state,
            errors: [...state.errors, error]
        };
    }),
    on(removeError, (state, { error }) => {
        return {
            ...state,
            errors: state.errors.filter(err => err !== error)
        };
    }),
    on(noop, (state) => {
        const currentTime = Date.now();
        const threshold = 10000; // Adjust as needed (5 minutes in milliseconds)

        const filteredErrors = state.errors.filter(err => currentTime - err.time <= threshold);

        return {
            ...state,
            errors: filteredErrors
        };
    })
);