import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";

export const fetchSubredditData = createAsyncThunk('subreddit/fetchSubredditData', async (subreddit, thunkAPI) => {

    try {
        // fetches the subreddit data. Expects non prefixed subreddit name, example 'worldnews'
        const response = await fetch(`/subreddit_data?subreddit=${subreddit}`);
        const data = await response.json();
        
        if (response.status !== 200 ) throw new Error(data.message)
        const dataToStore = {
            [data.data.data.display_name]: data.data
        }
        
        return dataToStore;
    } catch (e) {
        
        return thunkAPI.rejectWithValue(e.message)
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
                state.errMessage = action.payload;
                state.isSubredditDataLoading = false;
            })
            .addCase(fetchSubredditData.fulfilled, (state, action) => {
             
                state.data = {
                    ...state.data,
                    ...action.payload
                }
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
export const selectIsSubredditDataLoading = (state) => state.subredditReducer.isSubredditDataLoading;

export const selectSubredditDataByName = createSelector([selectSubredditData, (state, subreddit) => subreddit], (data, subreddit) => {return {...data[subreddit]}})

export const selectSubredditErr = (state) => state.subredditReducer.errMessage;

export default subredditSlice.reducer;