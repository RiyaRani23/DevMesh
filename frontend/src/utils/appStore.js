import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
 import feedReducer from "./feedSlice";
 import connectionReducer from "./connectionSlice";
 import requetsReducer from "./requestSlice";


const appStore = configureStore({
    reducer: {
        user: userReducer,
         feed: feedReducer,
         connection: connectionReducer,
         requests: requetsReducer,
        
    },
});

export default appStore;