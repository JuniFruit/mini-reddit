import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchTopNews = createAsyncThunk('news/fetchTopNews', async (country = 'Turkey') => {

    try {
        const response = await fetch(`/news?country=${country}`);
        const data = await response.json();
        return data
    } catch (e) {
        
        return e.message
    }
    
});

const topNewsSlice = createSlice({

    name: 'news',
    initialState: {
        data: {},
        errMessage: '',
        isNewsLoading: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTopNews.rejected, (state, action) => {
                state.errMessage = action.payload.message;
                state.isNewsLoading = false
            })
            .addCase(fetchTopNews.fulfilled, (state, action) => {
                state.isNewsLoading = false;
                state.data = action.payload.data;
                state.errMessage = '';
            })
            .addCase(fetchTopNews.pending, (state,action) => {
                state.isNewsLoading = true;
                state.errMessage = '';
            })
    }
})

export const selectTopNews = (state) => state.topNewsReducer.data;
export const selectIsNewsLoading = (state) => state.topNewsReducer.isNewsLoading;

export default topNewsSlice.reducer;