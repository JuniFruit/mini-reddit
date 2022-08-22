import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchPostComments = createAsyncThunk('comments', async ({postId, title, subreddit}, thunkAPI) => {

    try {
        const response = await fetch(`/post_comments?subreddit=${subreddit}&title=${title}&postId=${postId}`);
        const data = await response.json();
        if (response.status !== 200 ) throw new Error(data.message)
        return data
    } catch (e) {
        return thunkAPI.rejectWithValue(e.message)
    }
})


const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        data: {},
        isCommentsListFetching: false,
        errMessage: ''
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPostComments.rejected, (state, action) => {
                state.isCommentsListFetching = false;
                state.errMessage = action.payload;
            })
            .addCase(fetchPostComments.fulfilled, (state, action) => {
                state.isCommentsListFetching = false;
                state.errMessage = '';
                state.data = {
                    ...state.data,
                    ...action.payload
                }
            })
            .addCase(fetchPostComments.pending, (state, action) => {
                state.isCommentsListFetching = true;
                state.errMessage = '';
            })
    }
})

export const selectPostComments = (state, id) => state.commentsReducer.data[id]
export const selectIsCommentsListFetching = (state) => state.commentsReducer.isCommentsListFetching;
export const selectCommentsErr = (state) => state.commentsReducer.errMessage;

export default commentsSlice.reducer