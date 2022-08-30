import React, { createElement } from 'react'
import { NewsContainer } from "./NewsContainer";
import './TopNews.css';
import { useEffect, useState } from "react";
import { numberOfNewsToShow } from "../../utilities/utilities";
import { selectTopNews, fetchTopNews, selectUserGeo } from "./topNewsSlice";
import { useDispatch, useSelector } from "react-redux";
import { randomNum } from '../../utilities/utilities';
import { DropdownMenu } from '../Dropdown/DropdownMenu';

const COUNTRIES = ['Canada', 'Russia', 'Turkey',]


//Renders news at the top of the page 

export let TopNews = () => {

    const dispatch = useDispatch();
    const topNewsData = useSelector(selectTopNews);
    const userGeo = useSelector(selectUserGeo)

    const [country, setCountry] = useState('')

    const [numberOfNews, setNumberOfNews] = useState(numberOfNewsToShow());
  

    const handleClick = (e) => {
        e.preventDefault();
        setCountry(e.currentTarget.lastChild.innerHTML)
    }
    const renderButtons = () => {

        const nodes = COUNTRIES.map(country => {
            return (
            <div>
                <button onClick={handleClick}>
                    <span>{country}</span>
                </button>
            </div>)
        })

        return nodes.map(node => node)
    }

    renderButtons();
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
        if (topNewsData.length) return;

        const newsPromise = dispatch(fetchTopNews(country))
        return () => {
            newsPromise.abort();
        }
    }, [numberOfNews, country]);

    const renderNews = () => {
        if (!topNewsData.length) return '';


        const dataToShow = topNewsData.slice(0, numberOfNews);

        return dataToShow.map((child, index) => {
            return <NewsContainer
                key={index}
                preview={child.urlToImage}
                title={child.title}
                source={child.source.name}
                permalink={child.url}
            />
        })
    }

    const renderNewsBlock = () => {
        if (!Object.values(topNewsData).length) return '';
        return (
            <div className="topNews-wrapper page-container">
                <div className='topNews-header flex-align-center'>
                    <h4>Top news in</h4>
                    <div className='dropdown'>
                        <h4>{!country ? userGeo.country : country}</h4>


                        <DropdownMenu>
                            {renderButtons()}
                        </DropdownMenu>
                    </div>
                </div>

                <div className="news-container noselect">

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