import { useRef, useEffect } from "react";

export const CommentSortBar = ({changeCommentSort, commentSortBar}) => {

    const commentSortBarControls = useRef(null)

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        changeCommentSort(e.currentTarget.innerHTML.toLowerCase())
  
    }


    useEffect(() => {
        commentSortBarControls.current?.childNodes.forEach(child => child.addEventListener('click', handleClick));

        return () => {
            commentSortBarControls.current?.childNodes.forEach(child => child.removeEventListener('click', handleClick))
        }
    }, [])

    return (
        <div ref={commentSortBarControls} className="comment-sortBar flex-align-center">
            <button className="">Top</button>
            <button className="">Random</button>
            <button className="">New</button>
            <button className="">Old</button>
            <button className="">Controversial</button>
            
            
        </div>
    )
}