import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

export const fetchMessages = createAsyncThunk('messages/fetchMessages', async () => {

    const formData = new FormData()
    formData.append('actionName', 'MessagesLoad')
	formData.append('messageId', '0')

	const response = await fetch('http://a0830433.xsph.ru/', {
		method: 'POST',
		body: formData,
	})

	return await response.json()
})

const messages = createSlice({
	name: 'messages',
	initialState: {
		messages: [],
		favorites: [],
		isLoading: false,
		error: false,
		videoModal: false,
		videoUrl: '',
		direction: 'normal'
	},
	reducers: {
		showVideoModal(state, action) {
			if (action.payload) {
				state.videoModal = true
				state.videoUrl = action.payload
			} else {
				state.videoModal = false
			}
		},
		addFavoriteMessage(state, action) {
			if (!state.favorites.includes(action.payload)) state.favorites.push(action.payload)
		},
		removeFavoriteMessage(state, action) {
			if (!state.favorites.includes(action.payload)) return
			const index = state.favorites.indexOf(action.payload)
			state.favorites.splice(index, 1)
		},
		setFavoritMessages(state, action) {
			state.favorites = action.payload
		},
		setDirection(state, action) {
			state.direction = action.payload
		}
	},
	extraReducers: (builder) => {
        builder
        .addCase(fetchMessages.pending, (state, action) => {
            state.isLoading = true
        })
        .addCase(fetchMessages.fulfilled, (state, action) => {
			state.messages = action.payload.Messages
			state.isLoading = false
		})
        .addCase(fetchMessages.rejected, (state, action) => {
			state.error = true
            state.isLoading = false
        })
	},
})

export default messages.reducer

export const {showVideoModal, addFavoriteMessage, removeFavoriteMessage, setFavoritMessages, setDirection} = messages.actions
