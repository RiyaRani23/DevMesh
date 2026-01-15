import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connections",
  initialState: {
    connections: []
  },
  reducers: {
    addConnection: (state, action) => {
      state.connections = action.payload;
    },
    removeConnection: (state, action) => {
      state.connections = state.connections.filter(
        conn => conn.id !== action.payload
      );
    }
  }
});

export const { addConnection, removeConnection } = connectionSlice.actions;
export default connectionSlice.reducer;