import {
	fetchBaseQuery,
	createApi,
	BaseQueryApi
} from '@reduxjs/toolkit/query/react'
import { IAuthRequest } from '../../../types'

interface IArgs {
	url: string
	method: 'post'
	body: IAuthRequest
}

const authQuery = fetchBaseQuery({
	baseUrl: 'http://95.214.11.83:8080/api/auth/',
	credentials: 'same-origin',
	prepareHeaders: headers => {
		headers.set('Content-Type', 'application/json')
		return headers
	}
})

const baseQueryWrapper = async (
	args: IArgs,
	api: BaseQueryApi,
	extraOptions: {}
) => {
	let result = await authQuery(args, api, {})

	console.log()
	if (
		result &&
		result.error &&
		result.error.status &&
		result.error.status !== 200 &&
		result.error.status !== 401 &&
		result.error.status !== 400
	) {
		alert(result?.data)
	}

	return result
}

export const authSlice = createApi({
	baseQuery: baseQueryWrapper,
	endpoints: builder => ({})
})
