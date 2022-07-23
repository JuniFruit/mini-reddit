import { images } from "../../assets/images";
import { NewsContainer } from "./NewsContainer";
import './TopNews.css';
import { useEffect, useState } from "react";
import { numberOfNewsToShow } from "../../utilities/utilities";
import { findNonSerializableValue } from "@reduxjs/toolkit";

export const TopNews = (props) => {

    const [numberOfNews, setNumberOfNews] = useState(numberOfNewsToShow());
    console.log(numberOfNews);

    useEffect(() => {

        const handleResize = () => {
            setNumberOfNews(numberOfNewsToShow())
        }

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    })

    const renderNews = () => {
        const dataToShow = newsData.slice(0, numberOfNews);
        
        return dataToShow.map((data, index) => <NewsContainer key={index} data={data} />)
    }

    const newsData = [{
        headline: 'testNEws',
        img: images.testImg,
    },
    {
        headline: 'testNEws2',
        img: images.testImg,
    },{
        headline: 'testNEws3',
        img: images.testImg,
    },{
        headline: 'testNEws4',
        img: images.testImg,
    }]
    return (
        <div className="news-container">
            {renderNews()}
        </div>
    )
}