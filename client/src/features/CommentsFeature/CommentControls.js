import { useContext, useState } from "react";
import Icon from "../../assets/icons";
import { CommentVote } from "./CommentVote";
import { WriteComment } from "./WriteComment";
import { MobileContext } from '../../app/App';
import { DropdownMenu } from "../Dropdown/DropdownMenu";

export const CommentControls = (props) => {

    const [addReply, setAddReply] = useState(false)

    const isMobile = useContext(MobileContext);

    const appendWriteComment = (e) => {
        e.preventDefault();
        e.stopPropagation();
        return setAddReply(prevState => !prevState)


    }

    const closeReply = () => {
        setAddReply(false);
    }

    const renderDropdownControls = () => {


        return (
            <div className='dropdown' id="bottom-comment">
                <button className="flex-align-center">
                    <Icon icon="triple-dots" className="post-icons" />

                </button>
                <DropdownMenu>
                    <div className="comment-reply" id="bottom-comment">
                        <button onClick={appendWriteComment} className="flex-align-center">
                            <p>Reply</p>
                        </button>

                    </div>
                    <div className="comment-original" id="bottom-comment">

                        <a className="flex-align-center" rel="noreferrer" href={`https://www.reddit.com/${props.permalink}`} target="_blank">Reddit</a>


                    </div>
                    <div className="comment-report" id="bottom-comment">
                        <button>Report</button>
                    </div>
                </DropdownMenu>




            </div>
        )
    }

    return (
        <>
            <div className="comment-controls flex-align-center" id="bottom-comment">
                <CommentVote
                    votes={props.votes}
                    isLiked={props.isLiked}
                    thingName={props.thingName}
                    changeLikesProp={props.changeLikesProp} />
                {!isMobile
                    ?
                    <>
                        <div className="comment-reply" id="bottom-comment">
                            <button onClick={appendWriteComment} className="flex-align-center">
                                <Icon icon="comment" className="post-icons"></Icon>
                                <span>Reply</span>
                            </button>

                        </div>
                        <div className="comment-original" id="bottom-comment">

                            <a
                                className="flex-align-center"
                                rel="noreferrer"
                                href={`https://www.reddit.com/${props.permalink}`}
                                target="_blank">Reddit
                            </a>


                        </div>

                    </>
                    :
                    <>
                        {renderDropdownControls()}
                    </>

                }

            </div>
            {addReply ? <WriteComment parent_id={props.thingName} closeReply={closeReply} addComment={props.addComment} /> : null}
        </>

    )
}