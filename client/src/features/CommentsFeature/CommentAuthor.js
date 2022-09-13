import { elapsedTime } from "../../utilities/utilities"
import { images } from "../../assets/images"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react"
import { fetchCommentUserData, selectCommentUserData } from "./commentAuthorSlice";

export const CommentAuthor = (props) => {
    /* eslint-disable */
    const dispatch = useDispatch();
    const user = useSelector(state => selectCommentUserData(state, props.author, props.commentSort));
    
    
    useEffect(() => {
        if (user) return
        
        
        const promise = dispatch(fetchCommentUserData({author: props.author, commentsSort: props.commentSort}));
        
        return () => {
            promise.abort();
            
        }
        
    }, [dispatch, user])

    
    if (!user) return null;
    
    return (
        <div className="comment-author flex-align-center">
            <div className="author-img-container">
                <img src={user.snoovatar_img || user.icon_img} 
                onError={(e) => {e.target.onerror = null; e.target.src = images.defaultCommunityImg}} />
            </div>
            <span>{props.author}</span>
            <span>{elapsedTime(props.created_utc)}</span>
        </div>
    )
}