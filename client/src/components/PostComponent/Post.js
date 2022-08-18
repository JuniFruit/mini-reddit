
import { PostBottomControls } from './PostBottomControls';
import { PostAuthor } from './PostAuthor';
import { PostVote } from './PostVote';
import { PostContent } from './PostContent';


export const Post = (props) => {

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
                    />
                    <div className='post-content'>
                        <PostContent
                            post_hint={props.post_hint}
                            entire_data={props.entire_data}
                            is_video={props.is_video}
                            selfText={props.selfText}
                            url={props.url} 
                        />

                    </div>
                    <PostBottomControls num_comments={props.num_comments} />
                </div>
                
            </div>



        </div>

    )
}