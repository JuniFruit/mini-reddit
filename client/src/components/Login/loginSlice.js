import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAccessToken = createAsyncThunk(
    'login/fetchAccessToken', async (query) => {
        try {
            const response = await fetch(`/reddit_login?code=${query}`);
            const data = await response.json();
            return data
        } catch (e) {
            return e
        }

    }
)

const loginSlice = createSlice({

    name: 'login',
    initialState: {
        token: 'test',
        isLogged: false,
        errMessage: ''

    },
    

    extraReducers: (builder) => {
        builder

            .addCase(fetchAccessToken.rejected, (state, action) => {
                state.isLogged = false;
                state.token = '';
                state.errMessage = action.payload
            })
            .addCase(fetchAccessToken.fulfilled, (state, action) => {
                state.isLogged = true;
                state.token = action.payload.token;
                
                state.errMessage = '';
            })
    }

})


export const selectToken = (state) => state.loginReducer.token;
export const selectIsLogged = (state) => state.loginReducer.isLogged;
export const selectErrorMessage = (state) => state.loginSlice.errMessage;

export default loginSlice.reducer;