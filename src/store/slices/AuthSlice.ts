import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IAuthState, IAuthSuccessResponse, IServerMessage } from '../../types'

const initialState: IAuthState = {
	token: '',
	id: 0,
	username: '',
	password: '',
	error: null
}

export const AuthSlice = createSlice({
	name: 'AuthSlice',
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
		AuthUpdateUsername: (state, { payload }: PayloadAction<string>) => {
			state.username = payload
		},
		AuthUpdatePassword: (state, { payload }: PayloadAction<string>) => {
			state.password = payload
		},
		AuthUpdateError: (state, { payload }: PayloadAction<IServerMessage>) => {
			state.error = payload
		},
		AuthClear: (state): IAuthState => {
			return initialState
		}
	}
})
