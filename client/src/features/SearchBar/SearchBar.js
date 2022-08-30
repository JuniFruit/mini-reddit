import './SearchBar.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { debounce } from '../../utilities/utilities';


export const SearchBar = () => {

    const [query, setQuery] = useState('')

    const navigate = useNavigate();
   

    const handleSubmit = (e) => {
        e.preventDefault();

        navigate(`/search?q=${query}`)


        setQuery('')
    }

    return (
        <div className="searchBar-container">
            <form onSubmit={handleSubmit} className="searchBar-form" role='search'>
                <input onChange={(e) => debounce(setQuery(e.currentTarget.value), 500)} type="text" placeholder='Search posts or communities' value={query} maxLength={512}></input>
            </form>
        </div>
    )
}