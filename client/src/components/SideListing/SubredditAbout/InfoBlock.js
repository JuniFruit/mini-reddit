import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import remarkToc from "remark-toc";

export const Info = ({description}) => {

    return (
        <div className="subreddit-about-info-container side-listing-container" >
            <div className="subreddit-about-info-header">
                <h3>Info</h3>
            </div>
            <div className="subreddit-about-info-text">
                <div>
                    <ReactMarkdown remarkPlugins={[gfm, remarkToc]}>{description}</ReactMarkdown>

                </div>

            </div>
        </div>
    )

}