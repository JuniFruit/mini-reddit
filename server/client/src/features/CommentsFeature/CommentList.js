import { Comment } from "./Comment"

import './Comments.css'


export const CommentsList = ({ comments = [], commentSort, changeLikesProp, addComment }) => {


   
    const renderComments = () => {
        const commentsToRender = [].concat(comments)

        return commentsToRender.map((child) => {
           
            if (!child) return null;
            if (child.kind === 'more') return null;

            return (
            
                    <Comment

                        key={child.data.id}
                        author={child.data.author}
                        created_utc={child.data.created_utc}
                        permalink={child.data.permalink}
                        replies={child.data.replies}
                        votes={child.data.ups}
                        body={child.data.body}                   
                        commentSort={commentSort}
                        isLiked={child.data.likes}
                        thingName={child.data.name}
                        changeLikesProp={changeLikesProp}
                        addComment={addComment}
                   
                        
                    />
              
            )
        })
    }

    return renderComments()

}