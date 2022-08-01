import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../components/Login/loginSlice";
import postsReducer from "../features/PostFeature/postsSlice";
import topNewsSlice from "../features/TopNewsFeature/topNewsSlice";
import subredditSlice from "../features/subredditSlice";



const store = configureStore({
    reducer: {
        loginReducer,
        postsReducer,
        topNewsSlice,
        subredditSlice
    }
    
})

export default store;


