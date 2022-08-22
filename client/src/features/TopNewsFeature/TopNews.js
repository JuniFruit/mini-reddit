import { NewsContainer } from "./NewsContainer";
import './TopNews.css';
import { useEffect, useState } from "react";
import { numberOfNewsToShow } from "../../utilities/utilities";
import { selectTopNews, fetchUserGeoNews } from "./topNewsSlice";
import { useDispatch, useSelector } from "react-redux";
import parse from 'html-react-parser'
import React from 'react'

//Renders news at the top of the page 

export let TopNews = () => {

    const [numberOfNews, setNumberOfNews] = useState(numberOfNewsToShow());
    const dispatch = useDispatch();
    const topNewsData = useSelector(selectTopNews);


    useEffect(() => {

        const handleResize = () => {
            setNumberOfNews(numberOfNewsToShow())
        }

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    })

    useEffect(() => {

        dispatch(fetchUserGeoNews())
   
    }, []);

    const renderNews = () => {
        if (!topNewsData.length) return '';
        
        const dataToShow = topNewsData.slice(0, numberOfNews);

        return dataToShow.map((child, index) => {
            return <NewsContainer
                key={index}
                preview={parse(child.data.preview.images[0].source.url)}
                title={child.data.title}
                subreddit={child.data.subreddit_name_prefixed}
                subreddit_non_prefix={child.data.subreddit}
            />
        })
    }

    const renderNewsBlock = () => {
        if (!Object.values(topNewsData).length) return '';
        return (
            <div className="topNews-wrapper page-container">
                <h4>Top news</h4>
                <div className="news-container">

                    {renderNews()}
                </div>
            </div>

        )
    }


    return (
        renderNewsBlock()

    )
}

TopNews = React.memo(TopNews)