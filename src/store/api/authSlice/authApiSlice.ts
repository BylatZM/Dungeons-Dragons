import {
	IAuthRequest,
	IAuthSuccessResponse,
	IError,
	IMessage
} from '../../../types'
import { authSlice } from './authSlice'

export const authApiSlice = authSlice.injectEndpoints({
	endpoints: builder => ({
		signin: builder.mutation<IAuthSuccessResponse | void, IAuthRequest>({
			query: credential => {
				return {
					url: 'signin',
					method: 'post',
					body: { ...credential }
				}
			}
		}),
		signup: builder.mutation<IError | IMessage, IAuthRequest>({
			query: credential => {
				return {
					url: 'signup',
					method: 'post',
					body: { ...credential }
				}
			}
		})
	})
})

export const { useSigninMutation, useSignupMutation } = authApiSlice
