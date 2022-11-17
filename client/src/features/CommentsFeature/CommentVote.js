import { truncLargeNumber, redirectToRedditLogin } from "../../utilities/utilities"
import Icon from "../../assets/icons"
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../../components/Login/loginSlice";
import { useLocation } from "react-router-dom";
import { makeVote } from "../../api/apiSlice";


export const CommentVote = (props) => {

    const dispatch = useDispatch();
    const token = useSelector(selectToken);

    const location = useLocation();

    const handleUpVote = async (e) => {
        e.preventDefault();
        if (!token) return redirectToRedditLogin(location.pathname);
        let dir = '1';

        if (props.isLiked) dir = '0';
        dispatch(makeVote({ token, id: props.thingName, dir }));
        props.changeLikesProp(props.thingName, dir);

    }

    const handleDownVote = (e) => {
        e.preventDefault();
        if (!token) return redirectToRedditLogin(location.pathname);
        let dir = "-1";
        if (props.isLiked === false) dir = "0";

        dispatch(makeVote({ token, id: props.thingName, dir }));
        props.changeLikesProp(props.thingName, dir);
    }

    return (

        <div className='comment-vote-arrows-container'>
            <div className='comment-arrows flex-align-center'>
                <button onClick={handleUpVote}>
                    <Icon
                        icon="arrow-up2"
                        className={`ic_arrow_up2 post-icons ${props.isLiked ? 'arrow-up-active' : ''}`}
                    />
                </button>
                <span className='votes-number'>{truncLargeNumber(props.votes) < 2 ? 'Vote' : truncLargeNumber(props.votes)} </span>
                <button onClick={handleDownVote}>
                    <Icon
                        icon="arrow-down2"
                        className={`ic_arrow_down2 post-icons ${props.isLiked === false ? 'arrow-down-active' : ''}`}
                    />
                </button>
            </div>
        </div>
    )
}