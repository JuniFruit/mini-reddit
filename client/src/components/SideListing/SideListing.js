import { SubredditList } from "./SubredditTopList/SubredditList"
import './SideListing.css'
import React from "react"
import { SubredditAbout } from "./SubredditAbout/SubredditAbout"
import { useSelector } from "react-redux"
import { selectIsLogged } from "../Login/loginSlice"


// Renders different side blocks. Depends on what page you're in the app

export let SideListing = ({ subreddit, backToTop, postId, singlePost }) => {

    const isLogged = useSelector(selectIsLogged)


    const renderSideBlock = () => {
        if (subreddit) return <SubredditAbout subreddit={subreddit} postId={postId} singlePost={singlePost}/>;
        if (!subreddit) return <SubredditList isLogged={isLogged} backToTop={backToTop} />
    }

    return (
        <>
            {renderSideBlock()}
        </>


    )
}

const arePropsEqual = (prevProps, nextProps) => {
    return prevProps.subreddit === nextProps.subreddit
}

SideListing = React.memo(SideListing, arePropsEqual)