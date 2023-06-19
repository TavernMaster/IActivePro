import {configureStore} from '@reduxjs/toolkit'
import messageSlice from './reducers/MessageSlice'

export default configureStore({
	reducer: {messages: messageSlice},
})
