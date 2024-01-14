import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IError, IAuthState, ILoadingForm } from '../../types/StatesTypes'

const loadingInit: ILoadingForm = ''

const initialState: IAuthState = {
	email: '',
	access: '',
	password: '',
	errors: [],
	loading: loadingInit
}

export const AuthSlice = createSlice({
	name: 'AuthSlice',
	initialState,
	reducers: {
		AuthLoading: (
			state,
			{ payload }: PayloadAction<ILoadingForm>
		): IAuthState => {
			return { ...state, loading: payload }
		},
		AuthToken: (state, { payload }: PayloadAction<string>): IAuthState => {
			return {
				...state,
				access: payload,
				loading: loadingInit
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
				loading: loadingInit,
				errors: payload
			}
		},
		AuthClear: (state): IAuthState => {
			return initialState
		}
	}
})
