import Icon from "../../assets/icons"
import { images } from "../../assets/images"
import { PostVote } from "../../components/PostComponent/PostVote"
import { elapsedTime } from "../../utilities/utilities"


export const Comment = (props) => {

    return (
        <div className="comment-container">
            <div className="comment-wrapper">
                <div className="comment-author flex-align-center">
                    <div className="author-img-container">
                        <img src={images.defaultCommunityImg} />
                    </div>
                    <span>{props.author}</span>
                    <span>{elapsedTime(props.created_utc)}</span>
                </div>
                <div className="comment-body">
                    <p>{props.body}</p>
                </div>
                <div className="comment-controls flex-align-center" id="bottom-comment">
                    <div className='comment-vote-arrows-container'>
                        <div className='comment-arrows'>
                            <PostVote votes={props.votes}/>
                        </div>
                    </div>
                    <div className="comment-reply" id="bottom-comment">
                        <button className="flex-align-center">
                            <Icon icon="comment" className="ic_comment "></Icon>
                            <span>Reply</span>
                        </button>

                    </div>
                    <div className="comment-original" id="bottom-comment">
                        <button>
                            <a href="/">View on Reddit</a>
                        </button>

                    </div>
                    <div className="comment-share" id="bottom-comment">
                        <button>Share</button>
                    </div>
                    <div className="comment-report" id="bottom-comment">
                        <button>Report</button>
                    </div>
                </div>
            </div>
        </div>
    )
}