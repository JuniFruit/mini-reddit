import { SubredditList } from "./SubredditList"
import './SideListing.css'
import { useSelector } from "react-redux"
import { selectIsLogged } from "../Login/loginSlice"
import React from "react"
import { SubredditAbout } from "./SubredditAbout"

// Renders different side blocks. Depends on what page you're in the app

export let SideListing = ({ subreddit, backToTop }) => {

    const isLogged = useSelector(selectIsLogged);

    const renderSideBlock = () => {
        if (subreddit) return <SubredditAbout subreddit={subreddit} />;
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