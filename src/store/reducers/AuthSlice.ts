import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IAuthState, IAuthSuccessResponse, IError } from '../../types'
import { useLogout } from '../../components/hooks/useLogout'
import { useNavigate } from 'react-router-dom'

const initialState: IAuthState = {
	token: '',
	id: 0,
	username: '',
	password: '',
	error: null
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
			alert('Срок жизни сессии истек')
			localStorage.clear()
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
	AuthSaveToken
} = AuthSlice.actions

export default AuthSlice.reducer
