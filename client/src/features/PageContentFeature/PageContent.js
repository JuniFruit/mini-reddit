import './Post.css';
import { Post } from './Post';
import { useDispatch, useSelector } from 'react-redux';
import { selectPostsData, fetchPosts, removePost } from './postsSlice.js';
import { selectIsLogged } from '../../components/Login/loginSlice';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { SortBar } from '../SortBarFeature/SortBar';
import { SubredditList } from '../SubredditListFeature/SubredditList';


export const PageContent = () => {

    const dispatch = useDispatch();
    const postsData = useSelector(selectPostsData);


    const hidePost = (id) => {
        dispatch(removePost(id));
    }

    const isLogged = useSelector(selectIsLogged);

    let { sort, subreddit } = useParams();
    console.log(sort)
    if (sort === undefined) sort = 'hot';

    /* Fetches the posts for subreddit by specified sorting */

    useEffect(() => {
        if (postsData[sort]) return;
        dispatch(fetchPosts({ isLogged, sort, subreddit }))
    }, [sort])


    const renderPosts = () => {
        if (!Object.keys(postsData).length) return 'No posts';
        let postsToRender = [];
        if (postsData[sort]) postsToRender = postsData[sort].data.children.slice(); //Checks if necessary sort exists in the fetched data and makes copy

        return postsToRender.map((child, index) => {
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

    return (
        <div className='content-container'>
            <h4> Popular posts </h4>
            <div className='content-wrapper'>
                <div className="posts">
                    <SortBar />

                    {renderPosts()}
                </div>
                <div>
                  <SubredditList />  
                </div>
                
            </div>

        </div>

    )
}