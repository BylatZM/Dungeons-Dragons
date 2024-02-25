import { IAuthRequest, IAuthSuccessResponse } from '../../../types'
import { apiSlice } from '../apiSlice'

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		signin: builder.mutation<IAuthSuccessResponse | void, IAuthRequest>({
			query: data => ({
				url: 'auth/signin',
				method: 'POST',
				body: data
			})
		})
	})
})

export const { useSigninMutation } = authApiSlice
