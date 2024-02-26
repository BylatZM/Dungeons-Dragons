export interface IAuthRequest {
	username: string
	password: string
}

export interface IAuthSuccessResponse {
	token: string
	id: number
	username: string
}

export interface StoreState {
	AuthReducer: IAuthState
}

export interface IAuthState {
	token: string
	id: number
	username: string
	password: string
	error: IError | null
}

export interface IError {
	error: string
}

export interface IMessage {
	message: string
}

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

export type ICharacterGrade =
	| 'Бард'
	| 'Жрец'
	| 'Друид'
	| 'Монах'
	| 'Плут'
	| 'Колдун'
	| 'Варвар'
	| 'Воин'
	| 'Следопыт'
	| 'Паладин'
	| 'Чародей'
	| 'Волшебник'
