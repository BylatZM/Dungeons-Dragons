import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
	baseUrl: 'http://95.214.11.83:8080/api/',
	credentials: 'include',
	prepareHeaders: headers => {
		const storage_data = localStorage.getItem('token')
		let token = ''
		if (storage_data) token = JSON.parse(storage_data || '')
		headers.set('authorization', `Bearer ${token}`)
		headers.set('Access-Control-Allow-Origin', '*')
		return headers
	}
})

const baseQueryWrapper = async (args: any, api: any) => {
	let result = await baseQuery(args, api, {})

	if (result?.error?.status === 401) {
		alert(result?.data)
	}

	return result
}

export const apiSlice = createApi({
	baseQuery: baseQueryWrapper,
	endpoints: builder => ({})
})
