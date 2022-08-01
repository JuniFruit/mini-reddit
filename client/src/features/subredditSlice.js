import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSubredditData = createAsyncThunk('subreddit/fetchSubredditData', async (subreddit) => {

    try {

        const response = await fetch(`/subreddit_data?subreddit=${subreddit}`);
        const data = await response.json();
        
        return data;
    } catch (e) {
        
        return e.message
    }
    
});

const subredditSlice = createSlice({

    name: 'subreddit',
    initialState: {
        data: {},
        errMessage: ''
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubredditData.rejected, (state, action) => {
                state.errMessage = action.payload.message
            })
            .addCase(fetchSubredditData.fulfilled, (state, action) => {
               
                state.data = action.payload.data
                state.errMessage = ''
            })
    }
})

export const selectSubredditData = (state) => state.subredditSlice.data;

export default subredditSlice.reducer;