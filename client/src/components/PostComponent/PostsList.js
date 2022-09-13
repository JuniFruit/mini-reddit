import './Post.css';
import { Post } from './Post';
import { useDispatch, useSelector } from 'react-redux';
import { removePost } from './postsSlice.js';
import { SortBar } from '../SortBar/SortBar';
import { BackButton } from './BackButton';
import { SkeletonPost } from '../SkeletonComponents/SkeletonPost';
import { setLikes } from "./postsSlice";
import { hidePostApi } from '../../api/apiSlice';
import { selectToken } from '../Login/loginSlice';
import { redirectToRedditLogin } from '../../utilities/utilities';
import { useLocation } from 'react-router-dom';

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
    const token = useSelector(selectToken);
    const location = useLocation();

    const changeLikesProp = (thingName, dir) => {
        let likesProp; 
        if (dir === '0') likesProp = null;
        if (dir === '1') likesProp = true;
        if (dir === '-1') likesProp = false;
        
        const index = data.findIndex(child => child.data.name === thingName);
        dispatch(setLikes({
            sort,
            subreddit,           
            likesProp,
            index,
            singlePost
        }))
    }

  
    const hidePost = (thingName) => {
        if (!token) return redirectToRedditLogin(location.pathname)
        let sr = subreddit
        if (!subreddit) sr = 'undefined';

        dispatch(hidePostApi(thingName, token))
        dispatch(removePost({ name: thingName, sort, subreddit: sr }));

    }
    const renderPosts = () => {
       
        if (!data.length) return <SkeletonPost isMinified={isMinified} amount={fakeAmount} />
        
        const postsToRender = [].concat(data);

        return postsToRender.map((child, index) => {

            if (!child) return null;
            if (child.data.thumbnail === 'nsfw') return null;
            return (


                <Post
                    key={index}
                    thingName={child.data.name}
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
                    isLiked={child.data.likes}
                    changeLikesProp={changeLikesProp}
                />



            )
        })
    }

    const renderBackButton = () => {
        if (!singlePost) return null;

        return (
            <div className='post-top-bar'>
                <BackButton backToTop={backToTop} />
            </div>

        )
    }

    return (


        <div className="posts">
            {!sort ? renderBackButton() : <SortBar changeSort={changeSort} sort={sort}/>}

            {renderPosts()}
            {isFetching ? <SkeletonPost isMinified={isMinified} amount={fakeAmount} /> : null}
            
            {after || singlePost ? null : <h3 style={{ textAlign: "center" }}>You've reached the end</h3>}
        </div>



    )
}

