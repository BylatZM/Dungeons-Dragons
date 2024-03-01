import {
	fetchBaseQuery,
	createApi,
	BaseQueryApi,
	FetchArgs
} from '@reduxjs/toolkit/query/react'

import { AuthClear } from '../reducers/AuthSlice'

const apiQuery = fetchBaseQuery({
	baseUrl: 'http://95.214.11.83:8080/api/',
	credentials: 'same-origin',
	prepareHeaders: headers => {
		const storage = localStorage.getItem('token')
		if (storage) headers.set('Authorization', `Bearer ${storage}`)
		headers.set('Accept', 'application/json')
		headers.set('Content-Type', 'application/json')
		return headers
	}
})

const baseQueryWrapper = async (
	args: FetchArgs | string,
	api: BaseQueryApi,
	extraOptions: {}
) => {
	let result = await apiQuery(args, api, {})

	if (result?.error?.status === 401) {
		api.dispatch(AuthClear())
	}

	return result
}

export const apiSlice = createApi({
	baseQuery: baseQueryWrapper,
	endpoints: builder => ({})
})
