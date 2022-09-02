import './Post.css';
import { Post } from './Post';
import { useDispatch } from 'react-redux';
import { removePost } from './postsSlice.js';
import { SortBar } from '../SortBar/SortBar';
import { BackButton } from './BackButton';
import { SkeletonPost } from '../SkeletonComponents/SkeletonPost';


// Renders a list of posts based on data from LoadPosts component

export const PostsList = ({
    data = [],
    sort,
    subreddit,
    backToTop,
    singlePost,    
    isMinified,
    after = 'not null',
    fakeAmount,
    changeSort,
    isFetching }) => {

    const dispatch = useDispatch();

  
    const hidePost = (id) => {
        let sr = subreddit
        if (!subreddit) sr = 'undefined';

        dispatch(removePost({ id, sort, subreddit: sr }));

    }
    const renderPosts = () => {
       
        if (!data.length) return <SkeletonPost isMinified={isMinified} amount={fakeAmount} />
        
        const postsToRender = [].concat(data);

        return postsToRender.map((child, index) => {

            if (!child) return;
            if (child.data.thumbnail === 'nsfw') return;
            return (


                <Post
                    key={index}
                    hidePost={hidePost}
                    postId={child.data.id}
                    votes={child.data.ups}
                    byUser={child.data.author}
                    title={child.data.title}
                    url={child.data.url}
                    thumbnail={child.data?.thumbnail}
                    selfText={child.data.selftext}
                    num_comments={child.data.num_comments}
                    created_time={child.data.created_utc}
                    subreddit={child.data.subreddit_name_prefixed}
                    permalink={child.data.permalink}
                    subreddit_non_prefixed={child.data.subreddit}
                    is_video={child.data.is_video}
                    post_hint={child.data.post_hint}
                    entire_data={child.data}
                    backToTop={backToTop}
                    sr_detail={child.data.sr_detail}                  
                    singlePost={singlePost}
                    preview={child.data.preview}
                    isMinified={isMinified}
                />



            )
        })
    }

    const renderBackButton = () => {
        if (!singlePost) return;

        return (
            <div className='post-top-bar'>
                <BackButton backToTop={backToTop} />
            </div>

        )
    }

    return (


        <div className="posts" style={isMinified ? { width: "100%" } : { width: "50rem" }}>
            {!sort ? renderBackButton() : <SortBar changeSort={changeSort} />}

            {renderPosts()}
            {isFetching ? <SkeletonPost isMinified={isMinified} amount={fakeAmount} /> : ''}
            
            {after || singlePost ? '' : <h3 style={{ textAlign: "center" }}>You've reached the end</h3>}
        </div>



    )
}

