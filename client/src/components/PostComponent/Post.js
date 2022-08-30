import { PostBottomControls } from './PostBottomControls';
import { PostAuthor } from './PostAuthor';
import { PostVote } from './PostVote';
import { PostContent } from './PostContent';
import { useNavigate } from 'react-router-dom';

// Renders the entire post data

export const Post = (props) => {


    const navigate = useNavigate();

    const handleHide = () => {
        props.hidePost(props.postId)
    }

    const navigateToComments = () => {

        navigate(`${props.permalink}`)
    }

    const copyToClipboard = (value) => {
        console.log(window.location.href.split(/(\/r\w*?\d*?\/\w*?\d*?\w*)/)[0])
        if (value === 'copy link') navigator.clipboard.writeText(`http://localhost:3000${props.permalink}`);
        if (value === 'reddit link') navigator.clipboard.writeText(`https://www.reddit.com/${props.permalink}`)
    }




    return (


        <div className='post-container'>
            {props.isMinified
                ? ''
                :
                <div className='vote-arrows-container'>
                    <div className='vote-arrows'>
                        <PostVote votes={props.votes} />
                    </div>
                </div>}

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
                            ''
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
                        handleHide={handleHide}
                        singlePost={props.singlePost}
                        copyToClipboard={copyToClipboard}
                        isMinified={props.isMinified}
                    />
                </div>


            </div>



        </div>

    )
}

