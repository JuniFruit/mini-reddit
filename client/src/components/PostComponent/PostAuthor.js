import parse from 'html-react-parser';
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import { elapsedTime } from '../../utilities/utilities';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubredditData, selectSubredditData } from '../../features/subredditSlice';


export const PostAuthor = (props) => {

    const dispatch = useDispatch();
    const subredditData = useSelector(selectSubredditData);


    useEffect(() => {
        // Makes a call to fetch data of the current subreddit
        if (subredditData[props.subreddit_non_prefixed]) return;
        dispatch(fetchSubredditData(props.subreddit_non_prefixed))

    }, [dispatch]);

    // Based on the previous call, grabs the icons from the data and renders them

    const renderSubredditIcon = () => {

        if (!subredditData[props.subreddit_non_prefixed]) return '';

        return <img
            src={parse(subredditData[props.subreddit_non_prefixed].data.community_icon)}
            onError={(e) => { e.target.onerror = null; e.target.src = subredditData[props.subreddit_non_prefixed].data.icon_img }}
        />

    }

    return (
        <>
            <div className='post-author'>
                <div className='post-author-subreddit'>
                    {renderSubredditIcon()}
                    <Link to={'/'}><span>{props.subreddit}</span></Link>
                </div>
                <p className='post-author-dot'>•</p>
                <div className='post-author-description'>
                    <p>Post created by {props.byUser} {elapsedTime(props.created_time)}</p>
                </div>

            </div>
            <div className='post-title'>
                <h3>{parse(props.title)}</h3>
            </div>


        </>

    )
}