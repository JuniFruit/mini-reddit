import { SkeletonRenderer } from "./SkeletonRenderer"


export const SkeletonSideListing = ({ amount }) => {

    /* eslint-disable */

    return (
        <SkeletonRenderer amount={amount}>
            <div className="subreddit-about-container side-listing-container">
                <div className="subreddit-about-header">
                    <h3 className="skeleton skeleton-header-big"></h3>
                </div>
                <div className="subreddit-about-description">
                    <p className="skeleton skeleton-text"></p>
                    <p className="skeleton skeleton-text"></p>
                </div>
                <div className="subreddit-about-stats flex-align-center">
                    <div className="subreddit-about-members">

                    </div>
                    <div className="subreddit-about-online">

                    </div>
                    <div className="subreddit-about-noContent">

                    </div>
                </div>
                <hr className="line"></hr>
                <div className="subreddit-about-creation">
                    <div className="skeleton skeleton-icon"></div>
                    <span className="skeleton skeleton-header"> </span>
                </div>

            </div>
        </SkeletonRenderer>
    )
}