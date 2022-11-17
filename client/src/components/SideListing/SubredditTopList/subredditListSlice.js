import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSubredditList = createAsyncThunk('subredditList/fetchSubredditList', async (token = '', thunkAPI) => {

    try {        
        const response = await fetch(`/api/get_side_listing?token=${token}`);

        if (response.status !== 200 ) throw new Error(response.statusText)
        const data = await response.json();
        
        return data;
    } catch (e) {
        
        return thunkAPI.rejectWithValue(e.message)
    }
    
});

const subredditListSlice = createSlice({

    name: 'subredditList',
    initialState: {
        data: [],        
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
                
                state.data = [...action.payload.data];

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