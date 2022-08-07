import parse from 'html-react-parser';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubredditData, selectSubredditData } from "../subredditSlice";



export const NewsContainer = ({subreddit_non_prefix, preview, title, subreddit}) => {
    
    const dispatch = useDispatch();
    const subredditData = useSelector(selectSubredditData);
  

    useEffect(() => {

        dispatch(fetchSubredditData(subreddit_non_prefix));

    }, [dispatch])

    const renderNewsImage = () => {

        if (!subredditData[subreddit_non_prefix]) return '';
        
        return <img src={parse(subredditData[subreddit_non_prefix].data.community_icon)} onError={(e) => {e.target.onerror = null; e.target.src=' '}} />

    }

    const trimmedTitle = () => {
        if (title.length > 50) {
            const trimmed = title.slice(0, 47).concat('...');
            return trimmed
        }
        return title
    }
    return (
        <a className="news-wrapper">
            <div className="news" style={{ background: "url" + "(" + preview + ")" + "center center / cover no-repeat transparent" }}>
                <div className="news-title-wrapper">
                    <div className="news-title">
                        <h4>{trimmedTitle()}</h4>
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