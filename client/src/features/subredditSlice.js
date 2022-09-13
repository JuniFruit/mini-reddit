import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSubredditData = createAsyncThunk('subreddit/fetchSubredditData', async ({subreddit, token = ''}, thunkAPI) => {

    try {
        // fetches the subreddit data. Expects non prefixed subreddit name, example 'worldnews'
      

        const response = await fetch(`/api/get_subreddit_data?subreddit=${subreddit}&token=${token}`);

        if (response.status !== 200 ) throw new Error(response.statusText)
        const data = await response.json();
        
      
        const dataToStore = {
            [data.data.data.display_name]: data.data
        }
        
        return dataToStore;
    } catch (e) {
        
        return thunkAPI.rejectWithValue(e.message)
    }
    
});

export const fetchModlist = createAsyncThunk('subreddit/fetchModlist', async ({subreddit, token}, thunkAPI) => {

    try {     

        const response = await fetch(`/api/subreddit_modlist?subreddit=${subreddit}&token=${token}`);

        if (response.status !== 200 ) throw new Error(response.statusText)
        const data = await response.json();
        
        console.log(data)
        const dataToStore = {
            [subreddit]: {
                modlist: [...data.data.children]
            }
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
    reducers: {
        changeSubscription: (state, action) => {
            let value;
            if (action.payload.action === 'sub') value = true;
            if (action.payload.action === 'unsub') value = null;
            state.data[action.payload.subreddit].data.user_is_subscriber = value; 
        }
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
            .addCase(fetchModlist.rejected, (state, action) => {
                state.errMessage = action.payload;
                state.isSubredditDataLoading = false;
            })
            .addCase(fetchModlist.fulfilled, (state, action) => {
                const subreddit = Object.keys(action.payload)[0]
                state.data[subreddit].modlist = [...action.payload[subreddit].modlist]
                state.errMessage = '';
                state.isSubredditDataLoading = false;
            })
            .addCase(fetchModlist.pending, (state, action) => {
                state.errMessage = '';
                state.isSubredditDataLoading = true;
            })
    }
})

// export const selectSubredditData = (state) => state.subredditReducer.data;
export const selectIsSubredditDataLoading = (state) => state.subredditReducer.isSubredditDataLoading;
export const selectSubredditDataByName = (state, subreddit) => state.subredditReducer.data[subreddit]
export const selectModlist = (state, subreddit) => state.subredditReducer.data[subreddit]?.modlist
export const selectSubredditErr = (state) => state.subredditReducer.errMessage;

export const {changeSubscription} = subredditSlice.actions;

export default subredditSlice.reducer;