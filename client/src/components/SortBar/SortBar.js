import './SortBar.css';
import Icon from '../../assets/icons';

export const SortBar = ({ changeSort, sort }) => {  

    const handleClick = (e) => {
        e.preventDefault();
        changeSort(e.currentTarget.lastChild.innerHTML.toLowerCase());
    }
    return (
        <div className='sortBar'>

            <div className='sortBar-container'>
                <div className='sortBar-buttons'>

                    <button className={sort === "hot" && 'sort-active'} onClick={handleClick}>
                        <Icon icon="hot-svgrepo-com" className="ic_hot icons" />
                        <span>Hot</span>
                    </button>                   
                    <button className={sort === "new" && 'sort-active'} onClick={handleClick} >
                        <Icon icon="feed" className="ic_new icons" />
                        <span>New</span>
                    </button>
                    <button className={sort === "top" && 'sort-active'} onClick={handleClick}>
                        <Icon icon="stats-bars2" className="ic_top icons" />
                        <span>Top</span>
                    </button>



                </div>
               
            </div>
        </div>

    )
}