import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const fetchTopNews = createAsyncThunk('news/fetchTopNews', async (country = '', thunkAPI) => {

    try {
        const response = await fetch(`/news?country=${country}`);
        if (response.status !== 200 ) throw new Error(response.statusText)
        const data = await response.json();
        
        return data
    } catch (e) {

        return thunkAPI.rejectWithValue(e.message)
    }

});


const topNewsSlice = createSlice({

    name: 'news',
    initialState: {
        data: {
            newsData: [],
            userGeo: {}
        },
        errMessage: '',
        isNewsLoading: false,
        userGeo: {}
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTopNews.rejected, (state, action) => {
                state.errMessage = action.payload;
                state.isNewsLoading = false
            })
            .addCase(fetchTopNews.fulfilled, (state, action) => {
                state.data = {
                    ...state.data,
                    ...action.payload
                };
                state.errMessage = '';
                state.isNewsLoading = false;
            })
            .addCase(fetchTopNews.pending, (state, action) => {
                state.isNewsLoading = true;
                state.errMessage = '';
            })
                       
    }
})

export const selectTopNews = (state) => state.topNewsReducer.data.newsData;
export const selectIsNewsLoading = (state) => state.topNewsReducer.isNewsLoading;
export const selectNewsErr = (state) => state.topNewsReducer.errMessage;
export const selectUserGeo = (state) => state.topNewsReducer.data.userGeo;
export default topNewsSlice.reducer;