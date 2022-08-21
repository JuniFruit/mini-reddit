import './Post.css';
import { Post } from '../PostComponent/Post';
import { useDispatch } from 'react-redux';
import { removePost } from '../PostComponent/postsSlice.js';
import { SortBar } from '../SortBar/SortBar';
import parse from 'html-react-parser'

// Renders a list of posts based on data from LoadPosts component

export const PostsList = ({data, sort, subreddit, backToTop, singlePost}) => {
    

    const hidePost = (id) => {
        // dispatch(removePost(id));
    }    
    const renderPosts = () => {
        if (!data) return;
        let postsToRender = [].concat(data.children);
       

        return postsToRender.map((child, index) => {

            if (child.data.thumbnail === 'nsfw') return; //If a post has a nudity or other nsfw content, It returns
            return <Post
                key={index}                
                hidePost={hidePost}
                postId={child.data.id}
                votes={child.data.ups}
                byUser={child.data.author}
                title={parse(child.data.title)}
                url={parse(child.data.url)}
                thumbnail={child.data.thumbnail}
                selfText={parse(child.data.selftext)}
                num_comments={child.data.num_comments}
                created_time={child.data.created_utc}
                subreddit={child.data.subreddit_name_prefixed}
                permalink={child.data.permalink}
                subreddit_non_prefixed={child.data.subreddit}
                is_video={child.data.is_video}
                post_hint={child.data.post_hint}
                entire_data={child.data}
                backToTop={backToTop}
                singlePost={singlePost}
            />
        })
    }

    return (

        <div className="posts">
            {!sort ? '' : <SortBar sort={sort} subreddit={subreddit} />}

            {renderPosts()}
        </div>

    )
}

