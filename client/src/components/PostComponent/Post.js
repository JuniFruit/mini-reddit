import { useDispatch, useSelector } from 'react-redux';
import { fetchSubredditData, selectSubredditDataByName } from '../../features/subredditSlice';
import { useEffect } from 'react';
import { PostBottomControls } from './PostBottomControls';
import { PostAuthor } from './PostAuthor';
import { PostVote } from './PostVote';
import { PostContent } from './PostContent';

// Renders the entire post data

export const Post = (props) => {
   
    const dispatch = useDispatch();
    const subredditData = useSelector(state => selectSubredditDataByName(state, props.subreddit_non_prefixed));

    useEffect(() => {
        // Makes a call to fetch data of the current subreddit
        if (Object.keys(subredditData).length) return;
        dispatch(fetchSubredditData(props.subreddit_non_prefixed))

    }, []);
   

    if (!Object.keys(subredditData).length) return;

    

    const handleHide = () => {
        props.hidePost(props.id)
    }

    const handleClick = (e) => {
        e.currentTarget.lastChild.classList.toggle('active')


    }
    
    return (


        <div className='post-container'>
            <PostVote votes={props.votes} />
            <div className='post-wrapper'>
                <div className='post-header'>
                    <PostAuthor 
                        subreddit={props.subreddit} 
                        title={props.title} 
                        byUser={props.byUser} 
                        subreddit_non_prefixed={props.subreddit_non_prefixed}
                        created_time={props.created_time}
                        icon_img={subredditData.data.icon_img}
                        community_icon={subredditData.data.community_icon.replace(/&amp;/g, '&')}
                        backToTop={props.backToTop}
                        
                        
                    />
                    <div className='post-content'>
                        <PostContent
                            post_hint={props.post_hint}
                            entire_data={props.entire_data}
                            is_video={props.is_video}
                            selfText={props.selfText}
                            url={props.url} 
                            singlePost={props.singlePost}
                        />

                    </div>
                    <PostBottomControls 
                        num_comments={props.num_comments} 
                        permalink={props.permalink} 
                    />
                </div>
                
            </div>



        </div>

    )
}

