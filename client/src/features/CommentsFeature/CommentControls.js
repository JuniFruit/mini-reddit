import { useState } from "react";
import Icon from "../../assets/icons";
import { truncLargeNumber } from "../../utilities/utilities";
import { WriteComment } from "./WriteComment";

export const CommentControls = (props) => {

    const [addReply, setAddReply] = useState(false)


    const appendWriteComment = (e) => {
        e.preventDefault();
        e.stopPropagation();
        return setAddReply(prevState => !prevState)


    }

    return (
        <>
            <div className="comment-controls flex-align-center" id="bottom-comment">
                <div className='comment-vote-arrows-container'>
                    <div className='comment-arrows'>
                        <button><Icon icon="arrow-up2" className="ic_arrow_up2 post-icons" /></button>
                        <span className='votes-number'>{truncLargeNumber(props.votes) < 2 ? 'Vote' : truncLargeNumber(props.votes)} </span>
                        <button><Icon icon="arrow-down2" className="ic_arrow_down2 post-icons" /></button>
                    </div>
                </div>
                <div className="comment-reply" id="bottom-comment">
                    <button onClick={appendWriteComment} className="flex-align-center">
                        <Icon icon="comment" className="ic_comment "></Icon>
                        <span>Reply</span>
                    </button>

                </div>
                <div className="comment-original" id="bottom-comment">

                    <a className="flex-align-center" href={`https://www.reddit.com/${props.permalink}`} target="_blank">View on Reddit</a>


                </div>
                <div className="comment-share" id="bottom-comment">
                    <button>Share</button>
                </div>
                <div className="comment-report" id="bottom-comment">
                    <button>Report</button>
                </div>

            </div>
            {addReply ? <WriteComment /> : ''}
        </>

    )
}