import parse from 'html-react-parser'
import Icon from '../../assets/icons';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { selectSubredditData, fetchSubredditData } from '../subredditSlice';
import { useEffect } from 'react';
import { elapsedTime, truncLargeNumber } from '../../utilities/utilities';
import { TwitterTweetEmbed } from 'react-twitter-embed'



export const Post = (props) => {

    const dispatch = useDispatch();
    const subredditData = useSelector(selectSubredditData);


    useEffect(() => {

        dispatch(fetchSubredditData(props.subreddit_non_prefixed))

    }, [dispatch])

    const renderSubredditIcon = () => {
        
        if (!subredditData[props.subreddit_non_prefixed]) return '';
        
        return <img src={parse(subredditData[props.subreddit_non_prefixed].data.community_icon)} onError={(e) => { e.target.onerror = null; e.target.src = ' ' }} />

    }

    const renderPostVideo = () => {
        if (props.is_video === false) return '';

        return <video src={props.entire_data.secure_media.reddit_video.fallback_url} controls></video>

    }

    const renderEmbeddedMedia = () => {
        if (!props.entire_data.media) return '';
        if (props.entire_data.media.reddit_video) return '';
        if (!props.entire_data.media.oembed) return '';
        return <TwitterTweetEmbed tweetId={props.entire_data.media.oembed.url.split('/')[5]} />
    }



    const renderHtmlDescription = () => {
        if (!props.selfText) return '';

        return parse(props.selfText);
    }

    const handleHide = () => {
        props.hidePost(props.id)
    }

    const handleClick = (e) => {
        e.currentTarget.lastChild.classList.toggle('active')
       

    }

    return (


        <div className='post-container'>
            <div className='vote-arrows-container'>
                <div className='vote-arrows'>
                    <button><Icon icon="arrow-up" className="ic_arrow_up post-icons" /></button>
                    <span className='votes-number'>{truncLargeNumber(props.votes)} </span>
                    <button><Icon icon="arrow-down" className="ic_arrow_down post-icons" /></button>
                </div>
            </div>
            <div className='post-wrapper'>
                <div className='post-header'>
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
                    <div className='post-content'>
                        <Link className='post-description' to={'/'}>
                            <div className="description-data">

                                {parse(renderHtmlDescription())}

                            </div>

                        </Link>
                        <div className='post-media-container flex-align-center'>
                            <img src={props.url} onError={(e) => { e.target.onerror = null; e.target.src = ' ' }} />
                            {renderPostVideo()}
                            {/* {renderEmbeddedMedia()} */}
                        </div>
                    </div>
                </div>
                <div className='post-bottom'>
                    <Link className='post-comments flex-align-center' id='bottom' to={'/'}>
                        <Icon icon="comment" className="ic_comment post-icons" />
                        <span>{truncLargeNumber(props.num_comments)}</span>
                        <span>Comments</span>
                    </Link>
                    <div className='post-share flex-align-center' id='bottom' onClick={handleClick}>
                        <button className='flex-align-center'>
                            <Icon icon="share2" className="ic_share post-icons" />
                            <span>Share</span>
                        </button>
                        <button className='post-share-menu flex-align-center menu'>
                            <Icon icon="link" className="ic_link post-icons" />
                            <span>Copy link</span>
                        </button>
                    </div>
                    <div className='post-options flex-align-center' onClick={handleClick} id='bottom'>
                        <button>
                            <Icon icon="triple-dots" className="ic_dots post-icons" />
                        </button>
                        <button className='post-options-menu flex-align-center menu' onClick={handleHide}>
                            <div>
                                <Icon icon="eye-hide" className="ic_hide post-icons" />
                                <span>Hide</span>
                            </div>

                        </button>
                    </div>
                </div>
            </div>



        </div>

    )
}