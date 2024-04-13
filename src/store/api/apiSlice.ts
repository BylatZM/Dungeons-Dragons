import {
	fetchBaseQuery,
	createApi,
	BaseQueryApi,
	FetchArgs
} from '@reduxjs/toolkit/query/react'

import { AuthSessionStatus } from '../reducers/AuthSlice'
import { RootState } from '..'

const apiQuery = fetchBaseQuery({
	baseUrl: 'http://95.214.11.83:8080/api/',
	credentials: 'same-origin',
	prepareHeaders: (headers, { getState }) => {
		const token = (getState() as RootState).Auth.token

		if (token) headers.set('Authorization', `Bearer ${token}`)
		headers.set('Accept', 'application/json; charset=utf-8')
		headers.set('Content-Type', 'application/json; charset=utf-8')
		return headers
	}
})

const baseQueryWrapper = async (
	args: FetchArgs | string,
	api: BaseQueryApi,
	extraOptions: {}
) => {
	const result = await apiQuery(args, api, {})

	if (result?.error?.status === 401) {
		api.dispatch(AuthSessionStatus('expired'))
		alert('The session has expired, please log in again')
	}

	return result
}

export const apiSlice = createApi({
	baseQuery: baseQueryWrapper,
	endpoints: builder => ({})
})
