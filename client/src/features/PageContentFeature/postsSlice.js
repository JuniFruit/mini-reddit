import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async ({loginBoolean, sort, subreddit}) => {

    try {
        let endpoint = loginBoolean ? '/posts_auth' : '/posts_no_auth';
        
        const response = await fetch(`${endpoint}?subreddit=${subreddit}&sort=${sort}`);
        const data = await response.json();
        
        return data;
    } catch (e) {
        
        return e.message
    }
    
});

export const removePost = createAction('posts/removePost')

const postsSlice = createSlice({

    name: 'posts',
    initialState: {
        data: {},
        errMessage: ''
    },

    reducers: {
        removePost: (state, action) => {
            
            state.data.data.children = state.data.data.children.filter(child => child.data.id !== action.payload);
            
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.rejected, (state, action) => {
                state.errMessage = action.payload.message
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                
                state.data[Object.keys(action.payload)[1]] = action.payload[Object.keys(action.payload)[1]];
                state.errMessage = ''
            })
    }
})

export const selectPostsData = (state) => state.postsReducer.data;

export default postsSlice.reducer;