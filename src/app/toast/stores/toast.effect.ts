import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { removeError, showError } from "@App/toast/stores/toast.action";
import { tap, withLatestFrom } from "rxjs/operators";
import { toastState, selectToastErrors } from "@App/toast/stores/toast.reducer";

@Injectable()
export class ToastEffects {

    constructor(private actions$: Actions, private store: Store<toastState>) { }

    limitNotifications$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(showError),
                withLatestFrom(this.store.select(selectToastErrors)),
                tap(([action, errors]) => {
                    const maxNotifications = 5; // Adjust as needed
                    if (errors.length >= maxNotifications) {
                        const oldestError = errors[0];
                        this.store.dispatch(removeError({ error: oldestError }));
                    }
                })
            ),
        { dispatch: false }
    );
}
