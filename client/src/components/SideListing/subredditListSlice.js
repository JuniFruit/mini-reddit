import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSubredditList = createAsyncThunk('subredditList/fetchSubredditList', async (loginBoolean) => {

    try {
        const endpoint = loginBoolean ? '/user_subreddits' : '/top_subreddits'
        const response = await fetch(endpoint);
        const data = await response.json();
        
        return data;
    } catch (e) {
        
        return e.message
    }
    
});

const subredditListSlice = createSlice({

    name: 'subredditList',
    initialState: {
        data: {},
        errMessage: '',
        isSubListLoading: false
        

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubredditList.rejected, (state, action) => {
                state.errMessage = action.payload.message;
                state.isSubListLoading = false;
            })
            .addCase(fetchSubredditList.fulfilled, (state, action) => {
             
                state.data = [...action.payload.data]
                state.errMessage = '';
                state.isSubListLoading = false;
                
            })
            .addCase(fetchSubredditList.pending, (state, action) => {
                state.errMessage = '';
                state.isSubListLoading = true;
             
            })
    }
})

export const selectSubreddits = (state) => state.subredditListReducer.data;
export const selectIsSubListLoading = (state) => state.subredditListReducer.isSubListLoading;


export default subredditListSlice.reducer;