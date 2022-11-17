import { useSelector } from "react-redux";
import { selectSubreddits } from "./subredditListSlice";
import { Link } from "react-router-dom";
import { images } from "../../../assets/images";

export const Communities = ({ backToTop }) => {
    /* eslint-disable */
    const subredditsList = useSelector(selectSubreddits);

    const renderSubreddits = () => {
        if (!subredditsList) return null;
        let subredditsToRender = [];
        subredditsToRender = subredditsList.slice();

        return subredditsToRender.map((child, index) => {
            return (
                <li key={child.data.id}>
                    <div className="subreddit-item flex-align-center">
                        <div className="flex-align-center">
                            <div className="subreddit-item-number">
                                <span>{index + 1}</span>
                            </div>
                            <span>•</span>
                            <div className="subreddit-item-info flex-align-center">
                                
                                <img
                                
                                    src={child.data.icon_img === ''
                                        ?
                                        child.data.community_icon.replace(/&amp;/, '&')
                                        :
                                        child.data.icon_img
                                    }
                                    onError={(e) => { e.target.onerror = null; e.target.src = images.defaultCommunityImg }}
                                />
                                <span>
                                    <Link to={`/${child.data.display_name_prefixed}`}
                                        onClick={backToTop}>{child.data.display_name_prefixed}
                                    </Link>
                                </span>
                            </div>
                        </div>

                        <div className="subreddit-item-button">
                            <Link to={`/${child.data.display_name_prefixed}`} onClick={backToTop} className="button">
                                View
                            </Link>
                        </div>
                    </div>

                </li>
            )
        })
    }

    return renderSubreddits()

}