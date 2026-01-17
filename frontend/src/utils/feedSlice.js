import { createSlice } from '@reduxjs/toolkit';

const feedSlice = createSlice({
    name: 'feed',
    initialState: null,
    reducers: {
        addFeed: (state, action) => {
    if (!state) return action.payload; // Initial load
    return [...state, ...action.payload]; // Append new page data to existing list
   },
        removeUser: (state, action) => {
            const newFeed = state.filter((user) => user._id !== action.payload)
            return newFeed;
        },
    },
});

export const { addFeed, removeUser } = feedSlice.actions;

export default feedSlice.reducer;