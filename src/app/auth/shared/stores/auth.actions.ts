import { IUser } from "@App/shared/models/auth.model";
import { createAction, props } from "@ngrx/store";


export const loginInit = createAction('[Auth Page] init Login');
export const authFail = createAction('[Auth Page] Auth Fail', props<{ error: string }>());

// Login Action
export const loginWithEmail = createAction('[Auth Page] Login with Email', props<{ email: string, password: string }>());
export const loginWithGoogle = createAction('[Auth Page] Login with Google');
export const loginSuccess = createAction('[Auth Page] Login Success', props<{ user: IUser }>());

// Register Action
export const registerInit = createAction('[Auth Page] init Register');
export const register = createAction('[Auth Page] Register with Email', props<{ email: string, password: string }>());
export const registerSuccess = createAction('[Auth Page] Register Success', props<{ user: IUser }>());
export const registerFail = createAction('[Auth Page] Register Fail', props<{ error: string }>());

