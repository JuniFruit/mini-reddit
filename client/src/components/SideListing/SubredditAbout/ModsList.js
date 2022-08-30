

export const ModsList = ({isLogged}) => {

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
        <div className="subreddit-about-mods-container side-listing-container">
            <div className="subreddit-about-mods-header">
                <h3>Moderators</h3>
            </div>
            {renderMods()}

        </div>
    )
}