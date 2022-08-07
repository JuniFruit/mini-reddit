import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSubredditData = createAsyncThunk('subreddit/fetchSubredditData', async (subreddit) => {

    try {
        // fetches the subreddit data. Expects non prefixed subreddit name, example 'worldnews'
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
        errMessage: '',
        isSubredditDataLoading: false

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubredditData.rejected, (state, action) => {
                state.errMessage = action.payload.message;
                state.isSubredditDataLoading = false;
            })
            .addCase(fetchSubredditData.fulfilled, (state, action) => {
             
                state.data[action.payload.data.data.display_name] = action.payload.data
                state.errMessage = '';
                state.isSubredditDataLoading = false;
            })
            .addCase(fetchSubredditData.pending, (state, action) => {
                state.errMessage = '';
                state.isSubredditDataLoading = true;
            })
    }
})

export const selectSubredditData = (state) => state.subredditReducer.data;



export default subredditSlice.reducer;