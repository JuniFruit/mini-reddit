import { Link } from "react-router-dom";
import { elapsedTime } from '../../utilities/utilities';
import { images } from '../../assets/images';
import { useContext } from "react";
import { MobileContext } from "../../app/App";

//Renders a description and author credentials as well as a title of a post

export const PostAuthor = (props) => {

    /* eslint-disable */

    const isMobile = useContext(MobileContext);

    const renderSubredditIcon = () => {



        return <img
            src={props.icon_img || props.community_icon}
            onError={(e) => { e.target.onerror = null; e.target.src = images.defaultCommunityImg }}
        />

    }

    return (
        <>
            <div className='post-author'>
                <div className='post-author-subreddit'>
                    {renderSubredditIcon()}
                    <Link to={`/${props.subreddit}`} onClick={props.backToTop} className="flex-align-center">
                        <span>{props.subreddit}</span>
                    </Link>
                </div>
                <p className='post-author-dot'>•</p>
                <div className='post-author-description'>
                    {!isMobile
                        ?
                        <p>Created by {props.byUser} {elapsedTime(props.created_time)}</p>
                        :
                        <p>{elapsedTime(props.created_time)} by {props.byUser}</p>
                    }
                </div>

            </div>
            <div className='post-title' onClick={props.navigateToComments}>
                <h3>{props.title}</h3>
                {props.isMinified && props.thumbnail
                    ?
                    <div
                        className="thumbnail"
                        style={{ background: `url(${props.thumbnail}) center center / cover transparent` }}
                    >

                    </div>
                    :
                    null
                }
            </div>


        </>

    )
}