import { truncLargeNumber } from "../../utilities/utilities";
import Icon from "../../assets/icons";
import { Link } from "react-router-dom";
import { DropdownMenu } from "../../features/Dropdown/DropdownMenu";


//Renders bottom buttons and controls of a post

export const PostBottomControls = (props) => {

    const handleClick = (e) => {
        e.preventDefault();
        props.handleHide()

    }

    const handleCopy = (e) => {
        e.preventDefault();
        props.copyToClipboard(e.currentTarget.lastChild.innerHTML.toLowerCase())
    }

    return (
        <div className='post-bottom'>


            <div className='post-comments' id='bottom'>
                <Link to={props.permalink} className="flex-align-center">
                    <Icon icon="comment" className="ic_comment post-icons" />
                    <span>{!props.num_comments ? 'No' : truncLargeNumber(props.num_comments)}</span>
                    <span>Comments</span>
                </Link>
            </div>

            <div className='post-share flex-align-center dropdown' id='bottom' >
                <button className='flex-align-center'>
                    <Icon icon="share2" className="ic_share post-icons" />
                    <span>Share</span>
                </button>
                <DropdownMenu>
                    <div>
                        <button onClick={handleCopy}>
                            <Icon icon="link" className="ic_link post-icons" />
                            <span>Copy link</span>
                        </button>
                    </div>
                    <div>
                        <button onClick={handleCopy}>
                            <Icon icon="reddit" className="ic_reddit post-icons" />
                            <span>Reddit link</span>
                        </button>
                    </div>
                </DropdownMenu>




            </div>
            {!props.singlePost ? 
            <div className='post-options flex-align-center dropdown' id='bottom'>
                <button className="flex-align-center">
                    <Icon icon="triple-dots" className="post-icons" />

                </button>
                <DropdownMenu>
                    <div>
                        <button onClick={handleClick}>
                            <Icon icon="eye-hide" className="post-icons" />
                            <span>Hide</span>
                        </button>
                    </div>
                </DropdownMenu>




            </div> 
            : ''}
        </div>

    )
}