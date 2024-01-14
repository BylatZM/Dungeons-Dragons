export interface StoreState {
	AuthReducer: IAuthState
}

export interface IAuthState {
	email: string
	password: string
	access: string
	isLoading: boolean
	errors: IError[] | null
}

export interface IError {
	error: string
	type: string
}
