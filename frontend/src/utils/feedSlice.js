import { createSlice } from '@reduxjs/toolkit';

const feedSlice = createSlice({
    name: 'feed',
    initialState: null,
    reducers: {
        addFeed: (state, action) => {
  // If action.payload is the whole object { data: [...] }, extract the array
  if (action.payload && action.payload.data) {
     return action.payload.data;
  }
  // Otherwise, just return the payload (assuming it's already an array)
  return action.payload;
},
        removeUser: (state, action) => {
            const newFeed = state.filter((user) => user._id !== action.payload)
            return newFeed;
        },
    },
});

export const { addFeed, removeUser } = feedSlice.actions;

export default feedSlice.reducer;