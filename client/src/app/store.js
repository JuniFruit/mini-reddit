import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../components/Login/loginSlice";
import postsReducer from "../components/PostComponent/postsSlice";
import topNewsReducer from "../features/TopNewsFeature/topNewsSlice";
import subredditReducer from "../features/subredditSlice";
import subredditListReducer from "../components/SideListing/subredditListSlice";
import commentsReducer from "../features/CommentsFeature/commentsSlice";


const store = configureStore({
    reducer: {
        loginReducer,
        postsReducer,
        topNewsReducer,
        subredditReducer,
        subredditListReducer,
        commentsReducer
     
    }
    
})

export default store;


