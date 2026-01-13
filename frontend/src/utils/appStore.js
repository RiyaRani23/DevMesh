import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
// import feedReducer from "./feedSlice";
// import connectionReducer from "./connectionSlice";
// import requetsReducer from "./requestSlice";
// import searchReducer from "./searchSlice";

const appStore = configureStore({
    reducer: {
        user: userReducer,
        // feed: feedReducer,
        // connection: connectionReducer,
        // requests: requetsReducer,
        // search: searchReducer,
    },
});

export default appStore;