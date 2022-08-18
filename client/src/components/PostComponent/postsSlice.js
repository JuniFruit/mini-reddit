import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk('posts/fetchPosts', 
    async ({isLogged, sort, subreddit, after, previousChildren = []}) => {

    try {
        let endpoint = isLogged ? '/posts_auth' : '/posts_no_auth';
        
        const response = await fetch(`${endpoint}?subreddit=${subreddit}&sort=${sort}&after=${after}&count=25`);
        const data = await response.json();
        if (data.status === 'error') throw new Error(data.message);
        
        console.log(data.children)
        console.log(previousChildren)
        const dataToStore = {
            [sort]: {
                after: data.after,
                dist: data.dist,
                children: [...previousChildren, ...data.children]
            }
        }
        return dataToStore;
    } catch (e) {
        
        return e
    }
    
});

export const removePost = createAction('posts/removePost')

const postsSlice = createSlice({

    name: 'posts',
    initialState: {
        data: {},
        errMessage: '',
        isPostsLoading: false,
        
    },

    reducers: {
        removePost: (state, action) => {
            
            state.data.data.children = state.data.data.children.filter(child => child.data.id !== action.payload);
            
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.rejected, (state, action) => {
                state.errMessage = action.payload;
                state.isPostsLoading = false
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                
                state.data = {
                    ...state.data,
                   ...action.payload
                }
                state.isPostsLoading = false;
                state.errMessage = '';
            })
            .addCase(fetchPosts.pending, (state, action) => {
                state.errMessage = '';
                state.isPostsLoading = true;
            })
    }
})

export const selectPostsData = (state) => state.postsReducer.data;
export const selectIsPostsLoading = (state) => state.postsReducer.isPostsLoading;

export default postsSlice.reducer;