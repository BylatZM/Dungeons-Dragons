import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import AuthSlice from './reducers/AuthSlice'
import { apiSlice } from './api/apiSlice'

export const store = configureStore({
	reducer: {
		Auth: AuthSlice,
		[apiSlice.reducerPath]: apiSlice.reducer
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware()
			.concat(...(process.env.NODE_ENV !== 'production' ? [logger] : []))
			.concat(apiSlice.middleware),
	devTools: true
})

export type RootState = ReturnType<typeof store.getState>
