import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTopSubreddits = createAsyncThunk('topSubreddits/fetchTopSubreddits', async () => {

    try {
        // fetches top subreddits from reddit
        const response = await fetch(`/top_subreddits`);
        const data = await response.json();
        
        return data;
    } catch (e) {
        
        return e.message
    }
    
});

const topSubredditsSlice = createSlice({

    name: 'topSubreddits',
    initialState: {
        data: {},
        errMessage: '',
        

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTopSubreddits.rejected, (state, action) => {
                state.errMessage = action.payload.message;
                
            })
            .addCase(fetchTopSubreddits.fulfilled, (state, action) => {
             
                state.data = action.payload.data
                state.errMessage = '';
                
            })
            .addCase(fetchTopSubreddits.pending, (state, action) => {
                state.errMessage = '';
             
            })
    }
})

export const selectTopSubreddits = (state) => state.topSubredditsReducer.data;



export default topSubredditsSlice.reducer;