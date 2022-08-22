import './ErrorPopup.css';
import { ErrorPopup } from "./ErrorPopup"
import { selectPostsErr } from "../PostComponent/postsSlice";
import { selectLoginErr } from "../Login/loginSlice";
import { selectSubListErr } from "../SideListing/subredditListSlice";
import { selectSubredditErr } from "../../features/subredditSlice";
import { selectNewsErr } from "../../features/TopNewsFeature/topNewsSlice";
import { selectCommentsErr } from '../../features/CommentsFeature/commentsSlice';
import { useSelector } from "react-redux";


export const ErrorsList = () => {

    const postErr = useSelector(selectPostsErr);
    const commentsErr = useSelector(selectCommentsErr)
    const subErr = useSelector(selectSubredditErr);
    const subListErr = useSelector(selectSubListErr);
    const newsErr = useSelector(selectNewsErr);
    const loginErr = useSelector(selectLoginErr);

    const renderErrors = () => {
        const errorsArr = [].concat(postErr)
            .concat(commentsErr)
            .concat(subErr)
            .concat(subListErr)
            .concat(newsErr)
            .concat(loginErr)

        return errorsArr.map((error, index) => {
            if (error === '') return;
            return <ErrorPopup
                key={index} 
                errMsg={error} />
        })
    }

    return (
        <div className="error-container">
           {renderErrors()}
        </div>
    )

}