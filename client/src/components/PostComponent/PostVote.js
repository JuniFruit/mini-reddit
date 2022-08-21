import { truncLargeNumber } from "../../utilities/utilities"
import Icon from "../../assets/icons"

// Renders vote arrows of a post

export const PostVote = (props) => {


    return (
        <div className='vote-arrows-container'>
            <div className='vote-arrows'>
                <button><Icon icon="arrow-up" className="ic_arrow_up post-icons" /></button>
                <span className='votes-number'>{truncLargeNumber(props.votes) < 2 ? 'Vote' : truncLargeNumber(props.votes)} </span>
                <button><Icon icon="arrow-down" className="ic_arrow_down post-icons" /></button>
            </div>
        </div>
    )
}