import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { AuthReducer } from './reducers/AuthReducer'
import { authSlice } from './api/authSlice/authSlice'

export const store = configureStore({
	reducer: {
		AuthReducer: AuthReducer.reducer,
		[authSlice.reducerPath]: authSlice.reducer
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware()
			.concat(...(process.env.NODE_ENV !== 'production' ? [logger] : []))
			.concat(authSlice.middleware),
	devTools: true
})

export type RootState = ReturnType<typeof store.getState>
