import { images } from "../../assets/images"
import { redirectToRedditLogin, setStyles } from "../../utilities/utilities"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { changeSubscription, fetchSubredditData, selectSubredditDataByName } from "../../features/subredditSlice";
import { selectToken } from "../Login/loginSlice";
import { useLocation } from "react-router-dom";
import { subscribeToSubreddit } from "../../api/apiSlice";


// Renders community header if a user is on a subreddit page 

export let CommunityPage = ({ subreddit }) => {

    /* eslint-disable */


    const dispatch = useDispatch();
    const token = useSelector(selectToken);
    const location = useLocation();


    const subredditData = useSelector(state => selectSubredditDataByName(state, subreddit));

    useEffect(() => {

        if (subredditData) return;

        dispatch(fetchSubredditData({ subreddit, token }))


    }, [dispatch, subreddit])

    if (!subredditData) return null;
    
    const setPageStyles = () => {
        if (!subreddit) return;
        setStyles(subredditData.data.primary_color, subredditData.data?.banner_background_color)

    }

    const setBannerStyles = () => {

        if (!subredditData.data.banner_background_image.length) return;

        return {

            background:
                `url(${subredditData.data.banner_background_image}) center center / cover no-repeat transparent`
        }
    }

    const handleSwitchChange = (e) => {
        if (e.target.checked) return setStyles(subredditData.data.primary_color, subredditData.data.banner_background_color);
        return setStyles();
    }

    const renderSwitcher = () => {
        if (!subredditData.data.primary_color) return null;
        return (
            <div className="community-theme-switch">
                <span>Theme</span>
                <div className="theme-switch-button">
                    <label className="switch">
                        <input type="checkbox" defaultChecked onChange={handleSwitchChange}></input>
                        <span className="slider round"></span>
                    </label>
                </div>

            </div>
        )
    }

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!token) return redirectToRedditLogin(location.pathname);
        if (e.currentTarget.innerHTML === 'Banned') return;
        let action;
        if (e.currentTarget.innerHTML === 'Join') action = 'sub';
        if (e.currentTarget.innerHTML === 'Unjoin') action = 'unsub';

        dispatch(subscribeToSubreddit({ action, token, thingName: subredditData.data.name }));
        dispatch(changeSubscription({
            action,
            subreddit
        }))
    }

    const renderBtnText = () => {
        if (subredditData.data.user_is_subscriber) return 'Unjoin';
        if (!subredditData.data.user_is_subscriber) return 'Join';
        if (subredditData.data.user_is_banned) return 'Banned'
    }

    return (
        <>
            {setPageStyles()}
            <div
                className="community-banner-section"
                style={setBannerStyles()}>

            </div>
            <div className="community-header-bar">
                <div className="community-header-container">
                    <div className="community-header-info">
                        <div className="community-header-img-container">
                            <img src={
                                subredditData.data.community_icon
                                    ?
                                    subredditData.data.community_icon.replace(/&amp;/g, '&')
                                    :
                                    subredditData.data.icon_img
                            }

                                onError={(e) => { e.target.onerror = null; e.target.src = images.defaultCommunityImg }}
                            />
                        </div>
                        <div className="community-header-subreddit">
                            <h1>{`${subredditData.data.title}`}</h1>
                            <h2>{subredditData.data.display_name_prefixed}</h2>
                        </div>
                        <div className="community-header-button">
                            <button onClick={handleSubscribe} className="button">
                                {renderBtnText()}
                            </button>
                        </div>

                    </div>
                </div>
                {renderSwitcher()}


            </div>


        </>



    )

}

CommunityPage = React.memo(CommunityPage, (prevProps, nextProps) => prevProps.subreddit === nextProps.subreddit)