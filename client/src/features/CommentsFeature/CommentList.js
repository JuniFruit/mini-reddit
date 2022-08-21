
import { useSelector } from "react-redux"
import { selectPostComments } from "./commentsSlice"
import { Comment } from "./Comment"
import parse from 'html-react-parser'
import './Comments.css'


export const CommentsList = ({ postId }) => {

    const comments = useSelector(state => selectPostComments(state, postId))

    const renderComments = () => {
        if (!comments) return;
        const commentsToRender = [].concat(comments);


        return commentsToRender.map((child) => {

            return <Comment

                key={child.data.id}
                author={child.data.author}
                created_utc={child.data.created_utc}
                permalink={child.data.permalink}
                replies={child.data.replies}
                votes={child.data.ups}
                body={child.data.body}
                // body_html={parse(child.data.body_html)}
            />
        })
    }

    return renderComments()

}