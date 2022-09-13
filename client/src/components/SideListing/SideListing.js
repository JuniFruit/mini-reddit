import React from "react"
import { SubredditList } from "./SubredditTopList/SubredditList"
import './SideListing.css'
import { SubredditAbout } from "./SubredditAbout/SubredditAbout"

// Renders different side blocks. Depends on what page you're in the app

export let SideListing = ({ subreddit, backToTop, postId, singlePost }) => {

   if (subreddit === 'popular') return <SubredditList  backToTop={backToTop} />;

    return (
        <>
            {subreddit ? <SubredditAbout subreddit={subreddit} postId={postId} singlePost={singlePost} /> : null}
            {!subreddit ? <SubredditList  backToTop={backToTop} />: null}
        </>


    )
}

const arePropsEqual = (prevProps, nextProps) => {
    return prevProps.subreddit === nextProps.subreddit
}

SideListing = React.memo(SideListing, arePropsEqual)