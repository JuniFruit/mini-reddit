import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PostsList } from "./PostsList";
import { fetchPosts, selectSinglePost } from "./postsSlice";
import { SideListing } from "../SideListing/SideListing";
import { BackToTopButton } from "../../features/BackToTopButton/BackToTopButton";
import { useEffect } from "react";
import { selectIsLogged } from "../Login/loginSlice";
import { fetchPostComments } from "../../features/CommentsFeature/commentsSlice";

export const SinglePost = () => {

    const { postId, title } = useParams();
    const dispatch = useDispatch();
    const {subreddit} = useParams();
    const data = useSelector(state => selectSinglePost(state, subreddit, postId));
    const isLogged = useSelector(selectIsLogged);

    useEffect(() => {
        dispatch(fetchPosts({subreddit, isLogged}));
        dispatch(fetchPostComments({subreddit, postId, title}))
        
    }, [])
    
    if (!data) return;
    return (
        <>
            
            <div className='container'>
                
                <div className='page-container content-container'>
                    
                    <div className='content-wrapper'>

                        <PostsList data={data} singlePost={true} />

                        <div className='side-listing'>
                            <div>
                                <SideListing subreddit={subreddit} />

                            </div>
                            <BackToTopButton />

                        </div>

                    </div>
                </div>


            </div>

        </>
    )
}