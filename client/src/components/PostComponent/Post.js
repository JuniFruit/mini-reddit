import { PostBottomControls } from './PostBottomControls';
import { PostAuthor } from './PostAuthor';
import { PostVote } from './PostVote';
import { PostContent } from './PostContent';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { MobileContext } from '../../app/App';
import { copy } from '../../utilities/utilities';

// Renders the entire post data

export const Post = (props) => {

    const isMobile = useContext(MobileContext);
    const navigate = useNavigate();

    const renderArrows = () => {
        return (
           
            <div className='vote-arrows'>
                <PostVote 
                votes={props.votes} 
                thingName={props.thingName} 
                isLiked={props.isLiked}
                changeLikesProp={props.changeLikesProp}/>
            </div>
           
        )
    }    

    const navigateToComments = () => {

        navigate(`${props.permalink}`)
    }

    

    const copyToClipboard = (value) => {

        const redditLink = `https://www.reddit.com${props.permalink}`;
        const localLink = `https://reddit-mini-social.herokuapp.com${props.permalink}`;

        if (value === 'copy link') {
            if (navigator.userAgent.match(/ipad|ipod|iphone/i)) return copy(localLink);
            return navigator.clipboard.writeText(localLink)
        };
        if (value === 'reddit link') {
            if (navigator.userAgent.match(/ipad|ipod|iphone/i)) return copy(redditLink);
            return navigator.clipboard.writeText(redditLink)
        }
    }




    return (


        <div className='post-container'>
            {props.isMinified || isMobile
                ? null
                :
                <div className='vote-arrows-container'>
                    {renderArrows()}
                </div>

            }

            <div className='post-wrapper'>
                <div className='post-header'>
                    <PostAuthor
                        subreddit={props.subreddit}
                        title={props.title}
                        byUser={props.byUser}
                        subreddit_non_prefixed={props.subreddit_non_prefixed}
                        created_time={props.created_time}
                        icon_img={props.sr_detail.icon_img}
                        community_icon={props.sr_detail.community_icon}
                        backToTop={props.backToTop}
                        navigateToComments={navigateToComments}
                        isMinified={props.isMinified}
                        thumbnail={props.thumbnail}
                    />
                    <div className='post-content'>

                        {props.isMinified
                            ?
                            null
                            :
                            <PostContent
                                post_hint={props.post_hint}
                                entire_data={props.entire_data}
                                is_video={props.is_video}
                                selfText={props.selfText}
                                url={props.url}
                                singlePost={props.singlePost}
                            />}


                    </div>
                    <PostBottomControls
                        num_comments={props.num_comments}
                        permalink={props.permalink}                       
                        singlePost={props.singlePost}
                        copyToClipboard={copyToClipboard}
                        isMinified={props.isMinified}
                        votes={props.votes}
                        renderArrows={renderArrows}
                        thingName={props.thingName}
                        hidePost={props.hidePost}
                    />
                </div>


            </div>



        </div>

    )
}

