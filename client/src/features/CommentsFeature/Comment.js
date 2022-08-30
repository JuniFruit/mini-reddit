
import { CommentAuthor } from "./CommentAuthor"
import { CommentBody } from "./CommentBody"
import { CommentControls } from "./CommentControls"

import { Replies } from "./Replies"



export const Comment = (props) => {

    

    return (
        <>
            <div className="comment-container">


                <div className="comment-wrapper">
                    <CommentAuthor author={props.author} created_utc={props.created_utc} commentSort={props.commentSort} />
                    <CommentBody body={props.body} />
                    <CommentControls votes={props.votes} permalink={props.permalink} />

                    <Replies replies={props.replies?.data?.children} />

                </div>
            </div>
            
        </>

    )
}