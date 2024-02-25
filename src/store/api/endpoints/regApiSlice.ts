import { IAuthRequest, IServerMessage } from '../../../types'
import { apiSlice } from '../apiSlice'

export const regApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		signup: builder.mutation<IServerMessage, IAuthRequest>({
			query: data => ({
				url: 'auth/signup',
				method: 'POST',
				body: data
			})
		})
	})
})

export const { useSignupMutation } = regApiSlice
