import {configureStore} from '@reduxjs/toolkit'
import messages from './reducers/messages'

export default configureStore({
	reducer: {messages: messages},
})
