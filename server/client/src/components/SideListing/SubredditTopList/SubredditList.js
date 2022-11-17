import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { images } from "../../../assets/images";
import { selectToken } from "../../Login/loginSlice";
import { Communities } from "./Communities";
import './SubredditList.css';
import { fetchSubredditList, selectSubreddits } from "./subredditListSlice";


// Makes a call to grab and render top subreddits. Renderes different data whether you're logged or not

export const SubredditList = ({ backToTop }) => {

    const dispatch = useDispatch();
    const subredditsList = useSelector(selectSubreddits); 
    const token = useSelector(selectToken)

    useEffect(() => {
        if (subredditsList.length) return;
        const promise = dispatch(fetchSubredditList(token));
        return () => {
            promise.abort();
        }
    }, [subredditsList, dispatch, token])

   
  

    return (
        <div className="side-listing-container">
            <div className="listing-header" 
                 style={{ background: "url(" + images.bannerImg + ") center center / auto no-repeat transparent" }} >
                <div>
                    <h4 className="listing-heading">{token ? 'My communities' : 'Top communities'}</h4>
                </div>

            </div>
            <div className="listing-content">

               <ol>
                    <Communities backToTop={backToTop} />
               </ol>

            </div>
        </div>


    )
}


