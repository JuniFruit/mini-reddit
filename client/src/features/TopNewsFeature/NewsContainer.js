import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubredditData, selectSubredditDataByName } from "../subredditSlice";
import { truncTitle } from '../../utilities/utilities';

// Renders a piece of news 

export const NewsContainer = ({ subreddit_non_prefix, preview, title, subreddit }) => {

    const dispatch = useDispatch();
    const subredditData = useSelector(state => selectSubredditDataByName(state, subreddit_non_prefix));


    useEffect(() => {
        if (Object.keys(subredditData).length) return;
        dispatch(fetchSubredditData(subreddit_non_prefix));

    }, [dispatch])
    

    const renderNewsImage = () => {

        if (!Object.keys(subredditData).length) return '';

        return <img
            src={subredditData.data.icon_img} 
            onError={(e) => { e.target.onerror = null; e.target.src = subredditData.data.community_icon.replace(/&amp;/g, '&') }} />

    }


    return (
        <a className="news-wrapper">
            <div className="news" style={{ background: "url" + "(" + preview + ")" + "center center / cover no-repeat transparent" }}>
                <div className="news-title-wrapper">
                    <div className="news-title">
                        <h4>{truncTitle(title)}</h4>
                        <div className="news-title-subreddit">
                            {renderNewsImage()}
                            <p>{subreddit}</p>
                        </div>


                    </div>
                </div>

            </div>
        </a>

    )
}

