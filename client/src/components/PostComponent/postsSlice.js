import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchPosts = createAsyncThunk('posts/fetchPosts',
    async ({ isLogged = false, sort = '', subreddit, after = '', previousChildren = [] }) => {

        try {
            let endpoint = isLogged ? '/posts_auth' : '/posts_no_auth';
 
            const response = await fetch(`${endpoint}?subreddit=${subreddit}&sort=${sort}&after=${after}&count=${25}`);
            const data = await response.json();

            if (data.status === 'error') throw new Error(data.message);
        

            const dataToStore = {
                [subreddit]: {
                    children: [...previousChildren, ...data.children],
                    [sort]: {
                        after: data.after,
                        dist: data.dist,
                        children: [...previousChildren, ...data.children]
                    }

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
        data: {undefined: {}},
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
                // Structures data by subreddits and by sort
             
                const subreddit = Object.keys(action.payload)[0];
                const sort = Object.values(action.payload)[0]
                state.data = {
                        ...state.data,
                        [subreddit]: {
                        ...state.data[subreddit],
                        ...action.payload[subreddit]
                      
                        }
                    
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

export const selectPostsData = (state, subreddit) => state.postsReducer.data[subreddit] ? state.postsReducer.data[subreddit] : {};
export const selectIsPostsLoading = (state) => state.postsReducer.isPostsLoading;
export const selectPostsPagination = (state, subreddit, sort) => 
    state.postsReducer.data[subreddit] && state.postsReducer.data[subreddit][sort] ? state.postsReducer.data[subreddit][sort].after : '';


export const selectSinglePost = (state, subreddit, postId) => {
    if (!state.postsReducer.data[subreddit]) return;
    const singlePost = state.postsReducer.data[subreddit].children.filter(child => child.data.id === postId);
    
    return { children: [{...singlePost[0]}] }
}

export default postsSlice.reducer;