import Icon from "../../assets/icons";
import './SubredditAbout.css';
import { useSelector } from "react-redux";
import { selectSubredditDataByName } from "../../features/subredditSlice"
import { truncLargeNumber } from "../../utilities/utilities";
import parse from 'html-react-parser'
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { selectIsLogged } from "../Login/loginSlice";
import gfm from 'remark-gfm';
import remarkToc from "remark-toc";

//Renders About block when on a community page


export const SubredditAbout = ({subreddit}) => {

    const isLogged = useSelector(selectIsLogged)
    const subredditData = useSelector(state => selectSubredditDataByName(state, subreddit));

    if (!Object.keys(subredditData).length) return;

    const createdDate = new Date(subredditData.data.created_utc * 1000);

    const renderMods = () => {
        if (isLogged) {
            return (
                <ol>

                </ol>
            )
        } else {
            return <p>Moderators are hidden. <a 
                                                href="https://www.reddithelp.com/hc/en-us/articles/360049499032" 
                                                target="_blank">Learn more
                                                </a>
                    </p>
        }
    }
    return (
        <>

            <div className="subreddit-about-container side-listing-container">
                <div className="subreddit-about-header">
                    <h3>About {subredditData.data.display_name_prefixed}</h3>
                </div>
                <div className="subreddit-about-description">
                    
                    {subredditData.data.public_description}
                </div>  
                <div className="subreddit-about-stats">
                    <div className="subreddit-about-members">
                        <h4>{truncLargeNumber(subredditData.data.subscribers)}</h4>
                        <span>Members</span>
                    </div>
                    <div className="subreddit-about-online">
                        <h4>{truncLargeNumber(subredditData.data.active_user_count)}</h4>
                        <span>Online</span>
                    </div>
                    <div className="subreddit-about-noContent">

                    </div>
                </div>
                <hr className="line"></hr>
                <div className="subreddit-about-creation">
                    <Icon icon="hour-glass" className="ic_hourglass subreddit-creation-icon"></Icon>
                    <span>
                        Created {createdDate.toLocaleString('en-GB', {month: 'short'})} {createdDate.getDate()}, {createdDate.getFullYear()}
                    </span>
                </div>

            </div>

            <div className="subreddit-about-info-container side-listing-container" >
                <div className="subreddit-about-info-header">
                    <h3>Info</h3>
                </div>
                <div className="subreddit-about-info-text">
                    <div>
                        <ReactMarkdown remarkPlugins={[gfm, remarkToc]}>{subredditData.data.description}</ReactMarkdown> 
                       
                    </div>
                   
                </div>
            </div>
            <div className="subreddit-about-mods-container side-listing-container">
                <div className="subreddit-about-mods-header">
                    <h3>Moderators</h3>
                </div>
                {renderMods()}
                
            </div>
        </>

    )
}

