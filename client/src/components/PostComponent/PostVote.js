import { redirectToRedditLogin, truncLargeNumber } from "../../utilities/utilities"
import Icon from "../../assets/icons"
import { selectToken } from "../Login/loginSlice";
import { useSelector, useDispatch } from "react-redux";
import { makeVote } from "../../api/apiSlice";
import { useLocation } from "react-router-dom";


// Renders vote arrows of a post

export const PostVote = (props) => {  

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
        <>
            <button
        
                onClick={handleUpVote}>
                <Icon
                    icon="shift"
                    className={`ic_arrow_up post-icons ${props.isLiked ? 'arrow-up-active' : ''}`}
                />
            </button>
            <span className='votes-number'>{truncLargeNumber(props.votes) < 2 ? 'Vote' : truncLargeNumber(props.votes)} </span>

            <button
          
                onClick={handleDownVote}>
                <Icon
                    icon="shift"
                    className={`ic_arrow_down post-icons ${props.isLiked === false ? 'arrow-down-active' : ''}`}
                />
            </button>
        </>


    )
}