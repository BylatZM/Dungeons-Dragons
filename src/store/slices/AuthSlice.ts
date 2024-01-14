import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IError, IAuthState } from '../../types/StatesTypes'

const initialState: IAuthState = {
	email: '',
	access: '',
	password: '',
	errors: null,
	isLoading: false
}

export const AuthSlice = createSlice({
	name: 'AuthSlice',
	initialState,
	reducers: {
		AuthLoading: (state, { payload }: PayloadAction<boolean>) => {
			return { ...state, isLoading: payload }
		},
		AuthToken: (state, { payload }: PayloadAction<string>): IAuthState => {
			return {
				...state,
				access: payload,
				isLoading: false
			}
		},
		AuthEmail: (state, { payload }: PayloadAction<string>): IAuthState => {
			return {
				...state,
				email: payload
			}
		},
		AuthPassword: (state, { payload }: PayloadAction<string>): IAuthState => {
			return {
				...state,
				password: payload
			}
		},
		AuthError: (state, { payload }: PayloadAction<IError[]>): IAuthState => {
			return {
				...state,
				isLoading: false,
				errors: payload
			}
		},
		AuthClear: (state): IAuthState => {
			return initialState
		}
	}
})
