import { useEffect } from "react";
import parse from 'html-react-parser';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { images } from "../../assets/images";
import './SubredditList.css';
import { fetchSubredditList } from "./subredditListSlice";
import { selectIsLogged } from "../../components/Login/loginSlice";

export const SubredditList = () => {

    const dispatch = useDispatch();
    const subredditsList = {};
    const isLogged = useSelector(selectIsLogged);
   

    useEffect(() => {

        dispatch(fetchSubredditList(isLogged));

    }, [dispatch])



    const renderTopSubreddits = () => {

        if (!subredditsList.length) return '';
        let subredditsToRender = [];

        
        return subredditsList.map((child, index) => {
            return (
                <li key={index}>
                    <div className="subreddit-item flex-align-center">
                        <div className="flex-align-center">
                            <div className="subreddit-item-number">
                                <span>{index + 1}</span>
                            </div>
                            <span>•</span>
                            <div className="subreddit-item-info flex-align-center">
                                <img src={parse(child.data.community_icon)} onError={(e) => { e.target.onerror = null; e.target.src = images.defaultCommunityImg }} />
                                <span>{child.data.display_name_prefixed}</span>
                            </div>
                        </div>

                        <div className="subreddit-item-button">
                            <Link to={'/'} className="button">
                                View
                            </Link>
                        </div>
                    </div>

                </li>
            )
        })
    }

    return (
        <div className="subreddits-container">
            <div className="subreddits-header" style={{ background: "url" + "(" + images.bannerImg + ")" + "center center / auto no-repeat transparent" }} >
                <div>
                    <h4>{isLogged ? 'My communities' : 'Top communities'}</h4>
                </div>

            </div>
            <div className="subreddits-content">

                <ol>
                    {renderTopSubreddits()}

                </ol>


            </div>
        </div>
    )
}