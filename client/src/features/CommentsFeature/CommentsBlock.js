import { CommentsList } from "./CommentList";
import { useSelector } from "react-redux";
import { selectIsLogged } from "../../components/Login/loginSlice";
import { selectIsCommentsListFetching, selectPostComments } from "./commentsSlice";
import { fetchMorePostComments } from "./commentsSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { redirectToRedditLogin } from "../../utilities/utilities";
import { useLocation } from "react-router-dom";
import { CommentNoList } from "./CommentNoList";
import { SkeletonComment } from "../../components/SkeletonComponents/SkeletonComment";


export const CommentsBlock = ({ postId, commentSort }) => {

    const location = useLocation();
    const [amountToRender, setAmountToRender] = useState(5);

    const dispatch = useDispatch();
    const comments = useSelector(state => selectPostComments(state, postId, commentSort))
    const isLogged = useSelector(selectIsLogged);
    const isFetching = useSelector(selectIsCommentsListFetching)

    useEffect(() => {

        return () => {
            setAmountToRender(5)
        }
    }, [commentSort])

    const loadMoreComments = (commentsArr) => {
        if (!isLogged) return redirectToRedditLogin(location.pathname)

        const more = commentsArr.slice(-1)
        const data = more[0].data;

        const { children, parent_id, name } = data

        dispatch(fetchMorePostComments({ children: children.slice(0, 50), parent_id, name, postId, commentSort }))
    }



    const expandComments = () => {
        setAmountToRender(prevState => prevState + 10);
        if (amountToRender === dataToRender.length) loadMoreComments(comments[commentSort])
    }

   
   
    const dataToRender = [].concat(comments);
    const more = dataToRender.slice(-1) // Gets last element which is 'more' object for calling additional comments

    const renderLoadButton = () => {
       
        if (!more[0]) return;
        if (more[0].kind !== 'more') return '';
        let btnText = amountToRender === dataToRender.length ? 'Load more comments' : 'Expand'

        return <a role="button" className="loadMore-button" onClick={expandComments}> {btnText} </a>
    }


    return (
        <>
            {!dataToRender.length ? <CommentNoList /> : ''}

            <CommentsList
                comments={dataToRender.slice(0, amountToRender)}
                postId={postId}
                more={more}
                commentSort={commentSort}
            />

            {renderLoadButton()}
            {isFetching ? <SkeletonComment amount={5} /> : ''}
           
        </>






    )
}