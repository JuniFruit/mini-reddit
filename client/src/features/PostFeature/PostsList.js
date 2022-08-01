import './Post.css';
import { Post } from './Post';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectPostsData, fetchPopularPosts } from './postsSlice';


export const PostsList = () => {

    const dispatch = useDispatch();
    const postsData = useSelector(selectPostsData)
   
    const renderPosts = () => {
        if (!Object.values(postsData).length) return 'No posts';

        return postsData.data.children.map((child, index) => {
            return <Post
                key={index}
                votes={child.data.ups}
                byUser={child.data.author}
                title={child.data.title}
                url={child.data.url}
                thumbnail={child.data.thumbnail}
                selfText={child.data.selftext_html} 
                />
        })
    }


    useEffect(() => {

        dispatch(fetchPopularPosts());


    }, [dispatch])



    return (
        <div className="posts">
            
            {renderPosts()}
        </div>
    )
}