import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAccessToken = createAsyncThunk(
    'login/fetchAccessToken', async (query) => {
        try {
            const userResponse = await fetch(`/reddit_login?code=${query}`);
            const userData = await userResponse.json();

            const userSubsResponse = await fetch(`/user_subreddits`);
            const userSubsData = await userSubsResponse.json();

            return {userData, userSubsData}
        } catch (e) {
            return e
        }

    }
)

const loginSlice = createSlice({

    name: 'login',
    initialState: {
        data: {},
        isLogged: false,
        errMessage: ''

    },
    

    extraReducers: (builder) => {
        builder

            .addCase(fetchAccessToken.rejected, (state, action) => {
                state.isLogged = false;
                state.data = {};
                state.errMessage = action.payload
            })
            .addCase(fetchAccessToken.fulfilled, (state, action) => {
                state.isLogged = true;
               
                state.data = action.payload;
                state.errMessage = '';
            })
    }

})


export const selectUserData = (state) => state.loginReducer.data.userData.data;
export const selectUserSubs = (state) => state.loginReducer.data.userSubsData;
export const selectIsLogged = (state) => state.loginReducer.isLogged;
export const selectErrorMessage = (state) => state.loginSlice.errMessage;

export default loginSlice.reducer;