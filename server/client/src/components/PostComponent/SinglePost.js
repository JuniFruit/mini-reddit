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
import { selectToken } from "../Login/loginSlice";
import { postComment } from "../../api/apiSlice";



export const SinglePost = () => {
    /* eslint-disable */

    const [commentSort, setCommentSort] = useState('top');

    const { postId, title, subreddit } = useParams();
    const dispatch = useDispatch();
    const data = useSelector(state => selectSinglePost(state, subreddit));
    const comments = useSelector(state => selectPostComments(state, postId, commentSort));
    const token = useSelector(selectToken);



    const changeCommentSort = (sort) => {
        setCommentSort(sort)
    }



    useEffect(() => {
        if (comments) return;

        const promise = dispatch(fetchPostComments({ subreddit, title, postId, commentSort, token }));
        return () => {
            promise.abort();
        }
    }, [commentSort])

    const addComment = ({ parent_id, text }) => {
        dispatch(postComment({ parent_id, text, token, comments, commentSort }));
    }

    return (
        <>

            <div className='singlePost-page-container'>

                <div className='page-container content-container'>

                    <div className='content-wrapper'>
                        <div >
                            <PostsList
                                data={data?.children}
                                singlePost={true}
                                isMinified={false}
                                subreddit={subreddit} />

                            <div className="comments-block">

                                <WriteComment
                                    parent_id={data?.children[0]?.data.name}
                                    addComment={addComment} />

                                <CommentSortBar
                                    changeCommentSort={changeCommentSort}
                                    commentSort={commentSort} />

                                <CommentsBlock
                                    postId={postId}                                    
                                    commentSort={commentSort}
                                    addComment={addComment} />
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