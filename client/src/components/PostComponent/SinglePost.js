import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PostsList } from "./PostsList";
import { selectSinglePost } from "./postsSlice";
import { SideListing } from "../SideListing/SideListing";
import { BackToTopButton } from "../../features/BackToTopButton/BackToTopButton";
import { useEffect, useState } from "react";
import { CommentsBlock } from "../../features/CommentsFeature/CommentsBlock";
import { fetchPostComments, selectPostComments } from "../../features/CommentsFeature/commentsSlice";
import { WriteComment } from "../../features/CommentsFeature/WriteComment";
import { CommentSortBar } from "../../features/CommentsFeature/CommentSortBar";



export const SinglePost = () => {
    const [commentSort, setCommentSort] = useState('top');
    
    const { postId, title, subreddit } = useParams();
    const dispatch = useDispatch();
    const data = useSelector(state => selectSinglePost(state, subreddit));
    const comments = useSelector(state => selectPostComments(state, postId, commentSort))
    

   

    const changeCommentSort = (sort) => {
        setCommentSort(sort)
    }

  

    useEffect(() => {
        if (comments) return;
       
        const promise = dispatch(fetchPostComments({ subreddit, title, postId, commentSort }));
        return () => {
            promise.abort();
        }
    }, [commentSort])

   

    return (
        <>

            <div className='singlePost-page-container'>

                <div className='page-container content-container'>

                    <div className='content-wrapper'>
                        <div >
                            <PostsList data={data?.children} singlePost={true} isMinified={false} />

                            <div className="comments-block">

                                <WriteComment />
                                <CommentSortBar changeCommentSort={changeCommentSort} commentSort={commentSort} />
                                <CommentsBlock
                                    postId={postId}
                                    title={title}
                                    subreddit={subreddit}
                                    commentSort={commentSort}/>
                            </div>



                        </div>


                        <div className='side-listing'>
                            <div>
                                <SideListing subreddit={subreddit} postId={postId} singlePost={true} />

                            </div>
                            <BackToTopButton />

                        </div>

                    </div>
                </div>


            </div>

        </>
    )
}