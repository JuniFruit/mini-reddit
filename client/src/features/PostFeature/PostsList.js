import './Post.css';
import { Post } from './Post';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import postsSlice, { selectPostsData, fetchPopularPosts, removePost } from './postsSlice.js';


export const PostsList = () => {

    const dispatch = useDispatch();
    const postsData = useSelector(selectPostsData)
    console.log(postsData)

    const hidePost = (id) => {
        dispatch(removePost(id));
    }

    
    const renderPosts = () => {
        if (!Object.values(postsData).length) return 'No posts';

        return postsData.data.children.map((child, index) => {
            return <Post
                key={index}
                id={child.data.id}
                hidePost={hidePost}
                votes={child.data.ups}
                byUser={child.data.author}
                title={child.data.title}
                url={child.data.url}
                thumbnail={child.data.thumbnail}
                selfText={child.data.selftext_html}
                num_comments={child.data.num_comments}
                created_time={child.data.created_utc}
                subreddit={child.data.subreddit_name_prefixed}
                permalink={child.data.permalink}
                subreddit_non_prefixed={child.data.subreddit}
                is_video={child.data.is_video}
                entire_data={child.data}
                />
        })
    }


    useEffect(() => {

        dispatch(fetchPopularPosts());


    }, [])



    return (
        <div className="posts">
            
            {renderPosts()}
        </div>
    )
}