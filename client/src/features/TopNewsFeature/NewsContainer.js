import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubredditData, selectSubredditData } from "../subredditSlice";



export const NewsContainer = (props) => {
    
    const dispatch = useDispatch();
    const subredditData = useSelector(selectSubredditData);
   
    useEffect(() => {

        dispatch(fetchSubredditData(props.subreddit_non_prefix));

    }, [dispatch])

    const renderSubredditImg = () => {
        if (!Object.values(subredditData).length) return '';

        console.log(subredditData.data.icon_img)
        return subredditData.data.icon_img
    }

    const trimmedTitle = () => {
        if (props.title.length > 45) {
            const trimmed = props.title.slice(0, 40).concat('...');
            return trimmed
        }
        return props.title
    }
    return (
        <a className="news-wrapper">
            <div className="news" style={{ background: "url" + "(" + props.preview + ")" + "center center / cover no-repeat transparent" }}>
                <div className="news-title-wrapper">
                    <div className="news-title">
                        <h4>{trimmedTitle()}</h4>
                        <div className="news-title-subreddit">
                            <img src={renderSubredditImg()} onError={(e) => {e.target.onerror = null; e.target.src=' '}} />
                            <p>{props.subreddit}</p>
                        </div>
                        

                    </div>
                </div>

            </div>
        </a>

    )
}