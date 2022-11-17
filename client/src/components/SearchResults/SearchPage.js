import { useEffect, useState } from "react";
import { selectSearchResults, fetchSearchResults, selectIsSearchFetching } from "./searchResultsSlice";
import { useDispatch, useSelector } from "react-redux";
import { PostsList } from "../PostComponent/PostsList";
import { usePaginate } from "../../hooks/usePaginate";
import { CommunityList } from "../CommunityList/CommunityList";
import { NoResults } from "./NoResults";
import './SearchResults.css'
import { useSearchParams } from "react-router-dom";
import { usePrevPropValue } from "../../hooks/usePrevPropValue";
import { setStyles } from "../../utilities/utilities";

export const SearchPage = () => {

    const [amountToRender, setAmountToRender] = useState(25);

    const [loadMore] = usePaginate();
    const [type, setType] = useState('t3');
    const [searchParams] = useSearchParams();

    const prevType = usePrevPropValue(type)

    const dispatch = useDispatch();
    const searchResults = useSelector(state => selectSearchResults(state));
    const isFetching = useSelector(selectIsSearchFetching)
    const query = searchParams.get('q');



    const handleClick = (e) => {
        e.preventDefault();
        if (e.currentTarget.innerHTML.toLowerCase() === 'posts') setType('t3');
        if (e.currentTarget.innerHTML.toLowerCase() === 'communities') setType('t5')
    }

    useEffect(() => {
       
        dispatch(fetchSearchResults({ query }));


    }, [query, dispatch])

   

    useEffect(() => {
        setStyles(); //reset styles from a community page
        if (amountToRender < searchResults[type]?.children.length) return setAmountToRender(prevState => prevState + 25);
        return () => {
            if (prevType !== type) return setAmountToRender(25)
        }
    }, [loadMore, type, prevType, searchResults, amountToRender])


    if (!searchResults[type] && !isFetching) {

        return (<div className="page-container">
            <div className="type-buttons">
                <button onClick={handleClick} className="button">Posts</button>
                <button onClick={handleClick} className="button">Communities</button>
            </div>
            <NoResults />;
        </div>)



    }


    return (
        <div className="page-container">
            <div className="type-buttons">
                <button onClick={handleClick} className="button">Posts</button>
                <button onClick={handleClick} className="button">Communities</button>
            </div>

            {type === 't3'
                ?
                <PostsList
                    data={searchResults[type]?.children.slice(0, amountToRender)}
                    isMinified={true}
                    isFetching={isFetching} />
                :
                null
            }
            {type === 't5'
                ?
                <CommunityList
                    communities={searchResults[type]?.children.slice(0, amountToRender)} />
                :
                null
            }

            <div className="type-buttons flex-align-center">
                {window.scrollY > 500
                    ?
                    <button onClick={() => window.scrollTo(0, 0)} className="button">Back to Top</button>
                    :
                    null
                }
            </div>
        </div>
    )
}