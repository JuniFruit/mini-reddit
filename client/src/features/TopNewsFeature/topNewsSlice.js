import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { selectPostsErr } from "../../components/PostComponent/postsSlice";


export const fetchTopNews = createAsyncThunk('news/fetchTopNews', async (country = 'Turkey', thunkAPI) => {

    try {
        const response = await fetch(`/news?country=${country}`);
        const data = await response.json();
        if (response.status !== 200 ) throw new Error(data.message)

        return data
    } catch (e) {

        return thunkAPI.rejectWithValue(e.message)
    }

});

export const fetchUserGeoNews = createAsyncThunk('news/fetchUserGeoNews', async (thunkAPI) => {

    try {

        const response = await fetch('/check_user_geo');
        const data = await response.json();

        fetchTopNews()
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.message)
    }

});

const topNewsSlice = createSlice({

    name: 'news',
    initialState: {
        data: {},
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
                state.isNewsLoading = false;
                state.data = action.payload.data;
                state.errMessage = '';
            })
            .addCase(fetchTopNews.pending, (state, action) => {
                state.isNewsLoading = true;
                state.errMessage = '';
            })
            .addCase(fetchUserGeoNews.rejected, (state, action) => {
                state.errMessage = action.payload;
                state.isNewsLoading = false
            })
            .addCase(fetchUserGeoNews.fulfilled, (state, action) => {
                state.isNewsLoading = false;
                state.userGeo = action.payload.data;
                state.errMessage = '';
            })
            .addCase(fetchUserGeoNews.pending, (state, action) => {
                state.isNewsLoading = true;
                state.errMessage = '';
            })
            
    }
})

export const selectTopNews = (state) => state.topNewsReducer.data;
export const selectIsNewsLoading = (state) => state.topNewsReducer.isNewsLoading;
export const selectNewsErr = (state) => state.topNewsReducer.errMessage;


export default topNewsSlice.reducer;