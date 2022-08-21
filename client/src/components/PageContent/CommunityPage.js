import { images } from "../../assets/images"
import { setStyles } from "../../utilities/utilities"
import React, { useEffect, useState } from "react"

// Renders community header if a user is on a subreddit page 

export let CommunityPage = ({ subreddit }) => {

   
    const [subredditData, setSubredditData] = useState({})

    useEffect(() => {
        /* I had to make this call directly instead of grabbing data from the Store, 
        because Store data is updating too many times which causes this component to re-render */
        
        const fetchSubredditData = async () => {

            try {
                const response = await fetch(`/subreddit_data?subreddit=${subreddit}`);
                const json = await response.json();
                setSubredditData(json.data)
            } catch (e) {
                console.log(e);
            }
        }
        fetchSubredditData()


    }, [])
    
    if (!Object.keys(subredditData).length) return;

    const setPageStyles = () => {
        if (!subreddit) return;
        setStyles(subredditData.data.primary_color, subredditData.data.banner_background_color)

    }
    console.log(subredditData)
    const setBannerStyles = () => {

        if (!subredditData.data.banner_background_image.length) return;

        return {

            background: `url(${subredditData.data.banner_background_image.replace(/&amp;/, '&')}) center center / cover no-repeat transparent`
        }
    }

    const handleSwitchChange = (e) => {
        if (e.target.checked) return setStyles(subredditData.data.primary_color, subredditData.data.banner_background_color);
        return setStyles();
    }

    const renderSwitcher = () => {
        if (!subredditData.data.primary_color) return;
        return (
            <div className="community-theme-switch">
                <span>Community theme</span>
                <div className="theme-switch-button">
                    <label class="switch">
                        <input type="checkbox" defaultChecked onChange={handleSwitchChange}></input>
                        <span class="slider round"></span>
                    </label>
                </div>

            </div>
        )
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
                    <div className="community-header-info flex-align-center">
                        <div className="community-header-img-container">
                            <img src={
                                subredditData.data.community_icon ? subredditData.data.community_icon.replace(/&amp;/g, '&') : subredditData.data.icon_img}
                                onError={(e) => { e.target.onerror = null; e.target.src = images.defaultCommunityImg }}
                            />
                        </div>
                        <div className="community-header-subreddit">
                            <h1>{`${subredditData.data.title}`}</h1>
                            <h2>{subredditData.data.display_name_prefixed}</h2>
                        </div>
                        <div className="community-header-button">
                            <button className="button"> Join </button>
                        </div>
                    </div>
                </div>
                {renderSwitcher()}


            </div>
        </>



    )

}

CommunityPage = React.memo(CommunityPage, (prevProps, nextProps) => prevProps.subreddit === nextProps.subreddit)