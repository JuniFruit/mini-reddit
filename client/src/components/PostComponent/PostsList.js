import './Post.css';
import { Post } from '../PostComponent/Post';
import { useDispatch } from 'react-redux';
import { removePost } from '../PostComponent/postsSlice.js';
import { SortBar } from '../SortBar/SortBar';


export const PostsList = ({data, sort}) => {
    
   
    const hidePost = (id) => {
        // dispatch(removePost(id));
    }    
    const renderPosts = () => {
        if (!data) return;
        if (!data.children.length) return 'No posts';
        let postsToRender = [].concat(data.children);
        

        return postsToRender.map((child) => {

            if (child.data.thumbnail === 'nsfw') return; //If a post has a nudity or other nsfw content, It returns
            return <Post
                key={child.data.id}                
                hidePost={hidePost}
                votes={child.data.ups}
                byUser={child.data.author}
                title={child.data.title}
                url={child.data.url}
                thumbnail={child.data.thumbnail}
                selfText={child.data.selftext}
                num_comments={child.data.num_comments}
                created_time={child.data.created_utc}
                subreddit={child.data.subreddit_name_prefixed}
                permalink={child.data.permalink}
                subreddit_non_prefixed={child.data.subreddit}
                is_video={child.data.is_video}
                post_hint={child.data.post_hint}
                entire_data={child.data}
            />
        })
    }

    return (

        <div className="posts">
            <SortBar sort={sort} />

            {renderPosts()}
        </div>

    )
}