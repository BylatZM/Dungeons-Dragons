export interface StoreState {
	AuthReducer: IAuthState
}

export interface IAuthState {
	email: string
	password: string
	access: string
	loading: ILoadingForm
	errors: IError[]
}

export interface IError {
	error: string
	type: string
}

export type ILoadingForm = 'auth' | 'reg' | ''
