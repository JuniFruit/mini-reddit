import { useSelector } from "react-redux"
import { selectSinglePost } from "../../PostComponent/postsSlice";
import { Link } from "react-router-dom";
import { selectSubredditDataByName } from '../../../features/subredditSlice';
import Icon from "../../../assets/icons";
import './SubredditAbout.css';
import { truncLargeNumber } from "../../../utilities/utilities";
import { Info } from "./InfoBlock";
import { ModsList } from "./ModsList";
import {SkeletonSideListing} from '../../SkeletonComponents/SkeletonSideListing'


//Renders About block when on a community page or viewing a comment section


export const SubredditAbout = ({ subreddit, singlePost, postId }) => {
 
    const fetchedSubredditData = useSelector(state => selectSubredditDataByName(state, subreddit)); 
    const data = useSelector(state => selectSinglePost(state, subreddit, postId));
    
    const subredditData = fetchedSubredditData ? fetchedSubredditData.data : data?.sr_detail;

    if (!subredditData) return <SkeletonSideListing />

    const createdDate = new Date(subredditData.created_utc * 1000);

    

    return (
        <>

            <div className="subreddit-about-container side-listing-container">
                <div className="subreddit-about-header">
                    <h3>About {subredditData.display_name_prefixed}</h3>
                </div>
                <div className="subreddit-about-description">

                    {subredditData?.public_description}
                </div>
                <div className="subreddit-about-stats flex-align-center">
                    <div className="subreddit-about-members">
                        <h4>{truncLargeNumber(subredditData.subscribers)}</h4>
                        <span>Members</span>
                    </div>
                    <div className="subreddit-about-online">
                        {subredditData?.active_user_count
                            ?
                            <>
                                <h4>{truncLargeNumber(subredditData.active_user_count)}
                                </h4> <span>Online</span>
                            </>
                            :
                            <Link to={`${subredditData.url}`}><button className="button">View</button></Link>}
                    </div>
                    <div className="subreddit-about-noContent">

                    </div>
                </div>
                <hr className="line"></hr>
                <div className="subreddit-about-creation">
                    <Icon icon="hour-glass" className="ic_hourglass subreddit-creation-icon"></Icon>
                    <span>
                        Created {createdDate.toLocaleString('en-GB', { month: 'short' })} {createdDate.getDate()}, {createdDate.getFullYear()}
                    </span>
                </div>

            </div>

            {singlePost ? null : <Info description={subredditData.description} />}
            {singlePost ? null : <ModsList subreddit={subreddit}/>}
            
        </>

    )
}

