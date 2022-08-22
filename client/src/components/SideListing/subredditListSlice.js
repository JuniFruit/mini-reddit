import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSubredditList = createAsyncThunk('subredditList/fetchSubredditList', async (loginBoolean, thunkAPI) => {

    try {
        const endpoint = loginBoolean ? '/user_subreddits' : '/top_subreddits'
        const response = await fetch(endpoint);
        
        const data = await response.json();
        
        if (response.status !== 200 ) throw new Error(data.message)
        return data;
    } catch (e) {
        
        return thunkAPI.rejectWithValue(e.message)
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
                state.errMessage = action.payload;
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
export const selectSubListErr = (state) => state.subredditListReducer.errMessage;

export default subredditListSlice.reducer;