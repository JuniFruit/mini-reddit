import './SearchBar.css'


export const SearchBar = () => {

    return (
        <div className="searchBar-container">
            <form className="searchBar-form" role='search'>
                <input type="search" placeholder='Search'></input>
            </form>
        </div>
    )
}