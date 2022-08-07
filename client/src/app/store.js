import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../components/Login/loginSlice";
import postsReducer from "../features/PostFeature/postsSlice";
import topNewsReducer from "../features/TopNewsFeature/topNewsSlice";
import subredditReducer from "../features/subredditSlice";
import topSubredditsReducer from "../features/SubredditListFeature/topSubredditsSlice";


const store = configureStore({
    reducer: {
        loginReducer,
        postsReducer,
        topNewsReducer,
        subredditReducer,
        topSubredditsReducer,
     
    }
    
})

export default store;


