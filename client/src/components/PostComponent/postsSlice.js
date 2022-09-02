import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchPosts = createAsyncThunk('posts/fetchPosts',
    async ({ isLogged = false, sort = '', subreddit, after = '', previousChildren = [] }, thunkAPI) => {

        try {
            let endpoint = isLogged ? '/posts_auth' : '/posts_no_auth';

            const response = await fetch(`${endpoint}?subreddit=${subreddit}&sort=${sort}&after=${after}&count=25`);
            if (response.status !== 200) throw new Error(response.statusText)
            const data = await response.json();




            const dataToStore = {
                [subreddit]: {
                    sr_detail: { ...data.children[0].data.sr_detail },

                    [sort]: {
                        after: data.after,
                        dist: data.dist,
                        children: [...previousChildren, ...data.children]
                    }

                }
            }



            return dataToStore;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message)

        }

    });



const postsSlice = createSlice({

    name: 'posts',
    initialState: {
        data: { undefined: {} },
        errMessage: '',
        isPostsLoading: false,

    },
    reducers: {
        
        addSinglePost: (state, action) => {

            state.data[action.payload.subreddit] = {
                ...state.data[action.payload.subreddit],
                singlePost: action.payload.data[0],
                sr_detail: action.payload.data[0].data.sr_detail
            }
        },
        popSinglePost: (state, action) => {
            state.data[action.payload] = {
                ...state.data[action.payload],
                singlePost: ''
            }
        },
        removePost: (state, action) => {

            state.data[action.payload.subreddit][action.payload.sort].children = state.data[action.payload.subreddit][action.payload.sort]
                .children.filter(child => child.data.id !== action.payload.id)
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
                if (state.isPostsLoading === true) return;
                state.isPostsLoading = true;
            })
    }
})

export const selectPostsData = (state, subreddit, sort) => state.postsReducer.data[subreddit] ? state.postsReducer.data[subreddit][sort] : null;
export const selectIsPostsLoading = (state) => state.postsReducer.isPostsLoading;

export const selectSinglePost = (state, subreddit) => {
    // if (!state.postsReducer.data[subreddit]) return;

    const singlePost = state.postsReducer.data[subreddit]?.singlePost;
    if (!singlePost) return;

    return { children: [ {...singlePost} ], sr_detail: { ...state.postsReducer.data[subreddit].sr_detail } }
}



export const selectPostsErr = (state) => state.postsReducer.errMessage;

export const { addSinglePost, popSinglePost, removePost } = postsSlice.actions;

export default postsSlice.reducer;