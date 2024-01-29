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

export interface ICube {
	K6: number
	K100: number
	K8: number
	K4: number
	K2: number
	K10: number
	K12: number
	K20: number
}
