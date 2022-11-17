import React, { useEffect, useState } from "react";
import { NewsContainer } from "./NewsContainer";
import './TopNews.css';
import { numberOfNewsToShow } from "../../utilities/utilities";
import { selectTopNews, fetchTopNews, selectIsNewsLoading, setError } from "./topNewsSlice";
import { useDispatch, useSelector } from "react-redux";
import { randomPositiveRange } from '../../utilities/utilities';
import { DropdownMenu } from '../Dropdown/DropdownMenu';
import { SkeletonNewsContainer } from '../../components/SkeletonComponents/SkeletonNewsContainer';

const COUNTRY_CODES = ['au', 'be', 'bg', 'br', 'ca', 'ch', 'cn', 'co', 'cu', 'cz', 'de', 'fr', 'gb', 'gr',
    'in', 'it', 'jp', 'kr', 'lt', 'lv', 'ma', 'my', 'nl', 'pl', 'ru', 'sa', 'se', 'tr', 'ua', 'us']


//Renders news at the top of the page 



export let TopNews = () => {
    
    /* eslint-disable */
    const [country, setCountry] = useState('ca')
    const [numberOfNews, setNumberOfNews] = useState(numberOfNewsToShow());

    const dispatch = useDispatch();
    const topNewsData = useSelector(state => selectTopNews(state, country));  
    const isFetching = useSelector(selectIsNewsLoading)
    const regionName = new Intl.DisplayNames(['en'], { type: 'region' })



    const handleClick = (e) => {
        e.preventDefault();
        setCountry(e.currentTarget.className)       
    }
    const renderButtons = () => {

        
        const nodes = COUNTRY_CODES.map(country => {
            return (
                <div>
                    <button className={country} onClick={handleClick}>
                        <span>{regionName.of(country.toUpperCase())}</span>
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
        if (topNewsData) return;
        dispatch(fetchTopNews(country))

    }, [country])

    const renderNews = () => {

        if (isFetching || !topNewsData) return <SkeletonNewsContainer amount={numberOfNews} />

        const [rangeStart, rangeEnd] = randomPositiveRange(numberOfNews, topNewsData.length);
        const dataToShow = topNewsData.slice(rangeStart, rangeEnd);

        return dataToShow.map((child, index) => {

            if (!child) return null;

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

        return (
            <div className="topNews-wrapper page-container">
                <div className='topNews-header flex-align-center'>
                    <h4>Top news in</h4>
                    <div className='dropdown'>
                        <h4>{regionName.of(country.toUpperCase())}</h4>


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


    return renderNewsBlock()
}

TopNews = React.memo(TopNews)