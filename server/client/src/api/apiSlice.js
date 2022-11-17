/* This slice handles api calls that require access token */

/* eslint-disable */

import { createSlice } from '@reduxjs/toolkit';
import { mapReplies } from '../utilities/utilities';
import { addThread, changeData } from '../features/CommentsFeature/commentsSlice';

const REDDIT_BASE_URL = 'https://oauth.reddit.com';


const apiSlice = createSlice({
    name: 'api',
    initialState: {        
        isApiLoading: false,
        isSuccessful: true,
        errMsg: ''
    },

    reducers: {
        setLoading: (state, action) => {

            state.isApiLoading = true;
        },
        setSuccess: (state, action) => {

            state.isApiLoading = false;
            state.isSuccessful = true;
        },
        setError: (state, action) => {
            state.isApiLoading = false;
            state.isSuccessful = false;

            state.errMsg = action.payload;
        }

    }

})


export const selectIsApiLoading = (state) => state.apiReducer.isApiLoading;
export const selectApiErr = (state) => state.apiReducer.errMsg;

export const { setSuccess, setLoading, setError } = apiSlice.actions;

export default apiSlice.reducer;


export const makeVote = ({ id, dir, token }) => async (dispatch) => {
    try {
        dispatch(setLoading());

        const response = await fetch(`${REDDIT_BASE_URL}/api/vote`, {

            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `dir=${dir}&id=${id}&rank=2`
        })

        if (response.status !== 200) throw new Error(response.statusText);            

        dispatch(setSuccess())

    } catch (e) {
        dispatch(setError(e.message))

    }
}

export const postComment = ({ parent_id, text, token, comments, commentSort }) => async (dispatch) => {


    try {
        dispatch(setLoading());

        const response = await fetch(`/api/add_comment?token=${token}`, {

            method: "POST",
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({
                text,
                parent_id
            })
        })

        if (response.status !== 200) throw new Error(response.statusText);

        const data = await response.json();
  
   
        // we get our new comment as a response so we can add it to redux right away

        // if we starting new thread then we push our new comment to the top of the array
        if (data.link_id === parent_id) {
            dispatch(addThread({
                postId: data.link_id.replace(/t3_/g, ''),
                commentSort,
                thread: { kind: 't1', data: { ...data } }
            }))
        // if it's a reply, then we just add our comment to the parent
        } else {
            const changedData = mapReplies(
                { dataToMap: comments, nameToFind: parent_id, commentToAdd: { kind: 'Listing', data: { ...data } } })

            dispatch(changeData({
                postId: data.link_id.replace(/t3_/g, ''),
                commentSort,
                data: changedData
            }
            ));
        }


        dispatch(setSuccess())


    } catch (e) {

        dispatch(setError(e.message))

    }
}

export const hidePostApi = (thingName, token) => async (dispatch) => {

    try {


        dispatch(setLoading())

        await fetch(`${REDDIT_BASE_URL}/api/hide`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },

            body: `id=${thingName}`
        })

        dispatch(setSuccess())
    } catch (e) {
        dispatch(setError(e.message))
    }
}

export const subscribeToSubreddit = ({ action, thingName, token }) => async (dispatch) => {

    try {

        dispatch(setLoading())

        await fetch(`${REDDIT_BASE_URL}/api/subscribe`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },

            body: `action=${action}&sr=${thingName}`
        })

        dispatch(setSuccess())
    } catch (e) {
        dispatch(setError(e.message))
    }
}