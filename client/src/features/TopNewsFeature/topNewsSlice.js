import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchTopNews = createAsyncThunk('news/fetchTopNews', async (country) => {

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

export const selectTopNews = (state) => state.topNewsReducer.data;

export default topNewsSlice.reducer;