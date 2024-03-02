import {
	IAuthRequest,
	IAuthSuccessResponse,
	IError,
	IMessage
} from '../../types'
import { apiSlice } from './apiSlice'

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		signin: builder.mutation<IAuthSuccessResponse | void, IAuthRequest>({
			query: credential => {
				return {
					url: 'auth/signin',
					method: 'post',
					body: { ...credential }
				}
			}
		}),
		signup: builder.mutation<IError | IMessage, IAuthRequest>({
			query: credential => {
				return {
					url: 'auth/signup',
					method: 'post',
					body: { ...credential }
				}
			}
		})
	})
})

export const { useSigninMutation, useSignupMutation } = authApiSlice
