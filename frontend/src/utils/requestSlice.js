import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "requests",
    initialState: {
        received: [],
        sent: [],
    },
    reducers: {
        addReceivedRequests: (state, action) => {
            state.received = action.payload;
        },
        addSentRequests: (state, action) => {
            state.sent = action.payload;
        },
        removeRequest: (state, action) => {
            state.received = state.received?.filter(req => req._id !== action.payload) || [];
        }
    }
})

export const { addReceivedRequests, addSentRequests, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;