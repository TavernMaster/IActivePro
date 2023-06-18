import { createSlice } from "@reduxjs/toolkit";

const messages = createSlice({
    name: 'messages',
    initialState: {
        messages: []
	},
    reducers: {

    }
})

export default messages.reducer

export const {} = messages.actions