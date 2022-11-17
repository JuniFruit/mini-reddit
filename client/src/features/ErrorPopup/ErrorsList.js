import './ErrorPopup.css';
import { useSelector } from "react-redux";

import { ErrorPopup } from "./ErrorPopup"
import { selectPostsErr } from "../../components/PostComponent/postsSlice";
import { selectLoginErr } from "../../components/Login/loginSlice";
import { selectSubListErr } from "../../components/SideListing/SubredditTopList/subredditListSlice";
import { selectSubredditErr } from "../subredditSlice";
import { selectNewsErr } from "../TopNewsFeature/topNewsSlice";
import { selectCommentsErr } from '../CommentsFeature/commentsSlice';
import { selectCommentAuthorErrMsg } from '../CommentsFeature/commentAuthorSlice';
import { selectSearchErr } from '../../components/SearchResults/searchResultsSlice';
import { selectApiErr } from '../../api/apiSlice';


export const ErrorsList = () => {

    const postErr = useSelector(selectPostsErr);
    const commentsErr = useSelector(selectCommentsErr)
    const subErr = useSelector(selectSubredditErr);
    const subListErr = useSelector(selectSubListErr);
    const newsErr = useSelector(selectNewsErr);
    const loginErr = useSelector(selectLoginErr);
    const commentAuthorErr = useSelector(selectCommentAuthorErrMsg)
    const searchErr = useSelector(selectSearchErr);
    const apiErr = useSelector(selectApiErr);
    

    const renderErrors = () => {
        const errorsArr = [].concat(postErr)
            .concat(commentsErr)
            .concat(subErr)
            .concat(subListErr)
            .concat(newsErr)
            .concat(loginErr)
            .concat(commentAuthorErr)
            .concat(searchErr)
            .concat(apiErr)

        return errorsArr.map((error, index) => {
            if (error === '') return null;
            return <ErrorPopup
                key={index}
                errMsg={error} />
        })
    }

    return (
        <div className='error-section'>
            <div className="error-container">
                {renderErrors()}
            </div>
        </div>

    )

}