import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../components/Login/loginSlice";
import postsReducer from "../features/PageContentFeature/postsSlice";
import topNewsReducer from "../features/TopNewsFeature/topNewsSlice";
import subredditReducer from "../features/subredditSlice";
import subredditListReducer from "../features/SubredditListFeature/subredditListSlice";


const store = configureStore({
    reducer: {
        loginReducer,
        postsReducer,
        topNewsReducer,
        subredditReducer,
        subredditListReducer,
     
    }
    
})

export default store;


