import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchModlist, selectModlist } from "../../../features/subredditSlice";
import { selectToken } from "../../Login/loginSlice"


export const ModsList = ({ subreddit }) => {
    /* eslint-disable */
    
    const token = useSelector(selectToken);
    const dispatch = useDispatch();
    const modlist = useSelector(state => selectModlist(state, subreddit));

    useEffect(() => {
        if (!token) return;
        if (modlist) return;

        dispatch(fetchModlist({ subreddit, token }))

    }, [token, modlist, dispatch])

    const renderMods = () => {
        if (token && modlist) {
            return modlist.map(mod => {
                return (
                    <div className="mod-list">
                        <a href={`https://www.reddit.com/user/${mod.name}/`} rel="noreferrer" target="_blank" className="mod-item">{mod.name}</a>
                        {mod.author_flair_text && <span className="flair-text">{mod.author_flair_text}</span>}
                    </div>
                )
            })

        } else {
            return <p>Moderators are hidden. <a
                rel="noreferrer"
                href="https://www.reddithelp.com/hc/en-us/articles/360049499032"
                target="_blank">Learn more
            </a>
            </p>
        }
    }


    return (
        <div className="subreddit-about-mods-container side-listing-container">
            <div className="subreddit-about-mods-header">
                <h3>Moderators</h3>
            </div>
            {renderMods()}

        </div>
    )
}