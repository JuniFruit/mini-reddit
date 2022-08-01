import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchTopNews = createAsyncThunk('news/fetchTopNews', async () => {

    try {
        const response = await fetch("/news");
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
        errMessage: ''
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTopNews.rejected, (state, action) => {
                state.errMessage = action.payload.message
            })
            .addCase(fetchTopNews.fulfilled, (state, action) => {
                
                state.data = action.payload.data
                state.errMessage = ''
            })
    }
})

export const selectTopNews = (state) => state.topNewsSlice.data;

export default topNewsSlice.reducer;