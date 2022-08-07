import { NewsContainer } from "./NewsContainer";
import './TopNews.css';
import { useEffect, useState } from "react";
import { numberOfNewsToShow } from "../../utilities/utilities";
import { selectTopNews, fetchTopNews } from "./topNewsSlice";
import { useDispatch, useSelector } from "react-redux";
import parse from 'html-react-parser'


export const TopNews = () => {

    const [numberOfNews, setNumberOfNews] = useState(numberOfNewsToShow());
    const dispatch = useDispatch();
    const topNewsData = useSelector(selectTopNews);
  
    console.log(topNewsData)

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

        dispatch(fetchTopNews());

   
    }, [dispatch]);

    const renderNews = () => {

        const dataToShow = topNewsData.data.children.slice(0, numberOfNews);

        return dataToShow.map((child, index) => {
            return <NewsContainer
                key={index}
                preview={parse(child.data.preview.images[0].resolutions[3].url.replace(/&amp;/, '&'))}
                title={child.data.title}
                subreddit={child.data.subreddit_name_prefixed}
                subreddit_non_prefix={child.data.subreddit}
            />
        })
    }

    const renderNewsBlock = () => {
        if (!Object.values(topNewsData).length) return '';
        return (
            <div className="topNews-wrapper">
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