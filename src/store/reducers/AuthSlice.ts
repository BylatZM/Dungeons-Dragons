import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IAuthState, IAuthSuccessResponse, IError } from '../../types'

const initialState: IAuthState = {
	token: '',
	id: 0,
	username: '',
	password: '',
	error: null,
	sessionStatus: null
}

export const AuthSlice = createSlice({
	name: 'Auth',
	initialState,
	reducers: {
		AuthSaveApiResponse: (
			state,
			{ payload }: PayloadAction<IAuthSuccessResponse>
		) => {
			state.token = payload.token
			state.id = payload.id
			state.username = payload.username
			state.error = null
		},
		AuthSessionStatus: (
			state,
			{ payload }: PayloadAction<'expired' | null>
		) => {
			state.sessionStatus = payload
		},
		AuthSaveToken: (state, { payload }: PayloadAction<string>) => {
			state.token = payload
		},
		AuthUpdateUsername: (state, { payload }: PayloadAction<string>) => {
			state.username = payload
		},
		AuthUpdatePassword: (state, { payload }: PayloadAction<string>) => {
			state.password = payload
		},
		AuthUpdateError: (state, { payload }: PayloadAction<IError | null>) => {
			state.error = payload
		},
		AuthClear: (state): IAuthState => {
			return initialState
		}
	}
})

export const {
	AuthClear,
	AuthUpdateError,
	AuthUpdatePassword,
	AuthUpdateUsername,
	AuthSaveApiResponse,
	AuthSaveToken,
	AuthSessionStatus
} = AuthSlice.actions

export default AuthSlice.reducer
