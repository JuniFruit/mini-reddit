import { useEffect, useState } from "react";
import { selectSearchResults, fetchSearchResults, selectIsSearchFetching } from "./searchResultsSlice";
import { useDispatch, useSelector } from "react-redux";
import { PostsList } from "../PostComponent/PostsList";
import { usePaginate } from "../../hooks/usePaginate";
import { CommunityList } from "../CommunityList/CommunityList";
import './SearchResults.css'

export const SearchPage = () => {
    const [loadMore] = usePaginate();
    const [type, setType] = useState('t3');
    

    const dispatch = useDispatch();
    const searchResults = useSelector(selectSearchResults);
    const after = searchResults[type]?.after;
    const isFetching = useSelector(selectIsSearchFetching)
    const query = new URLSearchParams(window.location.search).get('q')
    console.log(query)
   

    const handleClick = (e) => {
        e.preventDefault();
        if (e.currentTarget.innerHTML.toLowerCase() === 'posts') setType('t3');
        if (e.currentTarget.innerHTML.toLowerCase() === 'communities') setType('t5')
    }

    useEffect(() => {
        
        const previousChildren = searchResults[type]?.children
        const promise = dispatch(fetchSearchResults({ query, after, previousChildren }));

        return () => {
            promise.abort()
        }
    }, [loadMore])

   
    


    return (
        <div className="page-container">
            <div className="type-buttons">
                <button onClick={handleClick} className="button">Posts</button>
                <button onClick={handleClick} className="button">Communities</button>
            </div>
            {type === 't3' ? <PostsList data={searchResults[type]?.children} isMinified={true} after={after} isFetching={isFetching}/> : ''}
            {type === 't5' ? <CommunityList communities={searchResults[type]?.children} /> : ''}
        </div>
    )
}