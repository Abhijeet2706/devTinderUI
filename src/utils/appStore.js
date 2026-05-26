import { configureStore } from "@reduxjs/toolkit";
import connectionsReducer from "./connectionsSlice";
import feedReducer from "./feedSlice";
import userReducer from "./userSlice";

const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        connections: connectionsReducer

    }
});

export default appStore;
