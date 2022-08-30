import { Comment } from "./Comment"

import './Comments.css'


export const CommentsList = ({ comments = [], more, commentSort }) => {


   
    const renderComments = () => {
        const commentsToRender = [].concat(comments)

        return commentsToRender.map((child) => {
            if (!child) return ;
            if (child.kind === 'more') return // Doesn't render 'more' object which we got earlier

            return (
            
                    <Comment

                        key={child.data.id}
                        author={child.data.author}
                        created_utc={child.data.created_utc}
                        permalink={child.data.permalink}
                        replies={child.data.replies}
                        votes={child.data.ups}
                        body={child.data.body}
                        more={more}
                        commentSort={commentSort}

                    />
              
            )
        })
    }

    return renderComments()

}