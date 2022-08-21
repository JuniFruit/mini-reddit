import { Link } from "react-router-dom";
import { elapsedTime } from '../../utilities/utilities';
import { images } from '../../assets/images';

//Renders a description and author credentials as well as a title of a post

export const PostAuthor = (props) => {
   
    const renderSubredditIcon = () => {
        
        

        return <img
            src={props.icon_img !== '' ?  props.icon_img : props.community_icon.replace(/&amp;/, '&')}
            onError={(e) => { e.target.onerror = null; e.target.src = images.defaultCommunityImg }}
        />

    }

    return (
        <>
            <div className='post-author'>
                <div className='post-author-subreddit'>
                    {renderSubredditIcon()}
                    <Link to={`/${props.subreddit}`} onClick={props.backToTop}><span>{props.subreddit}</span></Link>
                </div>
                <p className='post-author-dot'>•</p>
                <div className='post-author-description'>
                    <p>Post created by {props.byUser} {elapsedTime(props.created_time)}</p>
                </div>

            </div>
            <div className='post-title'>
                <h3>{props.title}</h3>
            </div>


        </>

    )
}