import { CommentsList } from "./CommentList";
import { useSelector } from "react-redux";
import { selectToken } from "../../components/Login/loginSlice";
import { selectIsCommentsListFetching, selectPostComments } from "./commentsSlice";
import { fetchMorePostComments, changeData } from "./commentsSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {  mapReplies, redirectToRedditLogin } from "../../utilities/utilities";
import { useLocation } from "react-router-dom";
import { CommentNoList } from "./CommentNoList";
import { SkeletonComment } from "../../components/SkeletonComponents/SkeletonComment";


export const CommentsBlock = ({ postId, commentSort, addComment }) => {

    const location = useLocation();
    const [amountToRender, setAmountToRender] = useState(5);

    const dispatch = useDispatch();
    const comments = useSelector(state => selectPostComments(state, postId, commentSort))
    const isFetching = useSelector(selectIsCommentsListFetching);
    const token = useSelector(selectToken)

    useEffect(() => {

        return () => {
            setAmountToRender(5)
        }
    }, [commentSort])


    const loadMoreComments = (commentsArr) => {
        if (!token) return redirectToRedditLogin(location.pathname)

        const more = commentsArr.slice(-1)
        const data = more[0].data;  
        const { children, parent_id, name } = data;

        dispatch(fetchMorePostComments({ children: children.slice(0, 50), parent_id, name, postId, commentSort, token }))
    }



    const expandComments = () => {
        setAmountToRender(prevState => prevState + 10);
  
        if (amountToRender >= dataToRender.length) loadMoreComments(comments)
    }

    const changeLikesProp = (thingName, dir) => {
        let likesProp;
        if (dir === '0') likesProp = null;
        if (dir === '1') likesProp = true;
        if (dir === '-1') likesProp = false;

        const changedData = mapReplies({dataToMap: comments, nameToFind: thingName, likesProp});
        dispatch(changeData({
            postId,
            commentSort,
            data: changedData
        }))
    }
      

    const dataToRender = [].concat(comments);

    const renderLoadButton = () => {

        const more = dataToRender.slice(-1)       
        if (more[0]?.kind !== 'more' && amountToRender >= dataToRender.length) return null;
        let btnText = amountToRender >= dataToRender.length ? 'Load more comments' : 'Expand'

        return <button className="loadMore-button" onClick={expandComments}> {btnText} </button>
    }


    return (
        <>
            {!dataToRender.length ? <CommentNoList /> : null}

            <CommentsList
                comments={dataToRender.slice(0, amountToRender)}
                postId={postId}              
                commentSort={commentSort}
                changeLikesProp={changeLikesProp}
                addComment={addComment}
            />

            {renderLoadButton()}
            {isFetching ? <SkeletonComment amount={5} /> : null}
            {!comments ? <SkeletonComment amount={5} /> : null}
           
        </>






    )
}