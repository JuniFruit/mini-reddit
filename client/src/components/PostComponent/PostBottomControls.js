import { truncLargeNumber } from "../../utilities/utilities";
import Icon from "../../assets/icons";
import { Link } from "react-router-dom";

//Renders bottom buttons and controls of a post

export const PostBottomControls = (props) => {


    return (
        <div className='post-bottom'>
            <Link className='post-comments flex-align-center' id='bottom' to={props.permalink}>
                <Icon icon="comment" className="ic_comment post-icons" />
                <span>{!props.num_comments ? 'No' : truncLargeNumber(props.num_comments)}</span>
                <span>Comments</span>
            </Link>
            <div className='post-share flex-align-center' id='bottom' >
                <button className='flex-align-center'>
                    <Icon icon="share2" className="ic_share post-icons" />
                    <span>Share</span>
                </button>
                <button className='post-share-menu flex-align-center menu'>
                    <Icon icon="link" className="ic_link post-icons" />
                    <span>Copy link</span>
                </button>
            </div>
            <div className='post-options flex-align-center'  id='bottom'>
                <button>
                    <Icon icon="triple-dots" className="ic_dots post-icons" />
                </button>
                <button className='post-options-menu flex-align-center menu' >
                    <div>
                        <Icon icon="eye-hide" className="ic_hide post-icons" />
                        <span>Hide</span>
                    </div>

                </button>
            </div>
        </div>

    )
}