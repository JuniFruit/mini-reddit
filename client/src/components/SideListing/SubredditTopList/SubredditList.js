import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { images } from "../../../assets/images";
import './SubredditList.css';
import { fetchSubredditList, selectSubreddits } from "./subredditListSlice";


// Makes a call to grab and render top subreddits. Renderes different data whether you're logged or not

export const SubredditList = ({ backToTop, isLogged }) => {

    const dispatch = useDispatch();
    const subredditsList = useSelector(selectSubreddits);
    
   

    useEffect(() => {
        if (Object.keys(subredditsList).length) return;
        const promise = dispatch(fetchSubredditList(isLogged));
        return () => {
            promise.abort();
        }
    }, [isLogged])

    


    const renderTopSubreddits = () => {
        if (!Object.keys(subredditsList).length) return '';
        let subredditsToRender = [];
        subredditsToRender = subredditsList.slice();

        return subredditsToRender.map((child, index) => {
            return (
                <li key={index}>
                    <div className="subreddit-item flex-align-center">
                        <div className="flex-align-center">
                            <div className="subreddit-item-number">
                                <span>{index + 1}</span>
                            </div>
                            <span>•</span>
                            <div className="subreddit-item-info flex-align-center">
                                <img
                                    src={child.data.icon_img === '' ? child.data.community_icon.replace(/&amp;/, '&') : child.data.icon_img}
                                    onError={(e) => { e.target.onerror = null; e.target.src = images.defaultCommunityImg }}
                                />
                                <span>{child.data.display_name_prefixed}</span>
                            </div>
                        </div>

                        <div className="subreddit-item-button">
                            <Link to={`/${child.data.display_name_prefixed}`} onClick={backToTop} className="button">
                                View
                            </Link>
                        </div>
                    </div>

                </li>
            )
        })
    }

    return (
        <div className="side-listing-container">
            <div className="listing-header" 
                 style={{ background: "url" + "(" + images.bannerImg + ")" + "center center / auto no-repeat transparent" }} >
                <div>
                    <h4 className="listing-heading">{isLogged ? 'My communities' : 'Top communities'}</h4>
                </div>

            </div>
            <div className="listing-content">

               <ol>
                    {renderTopSubreddits()}
               </ol>

            </div>
        </div>


    )
}


