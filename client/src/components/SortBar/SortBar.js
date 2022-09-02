import './SortBar.css'
import Icon from '../../assets/icons'
import { Link } from 'react-router-dom'

export const SortBar = ({changeSort}) => {

    const handleClick = (e) => {
        e.preventDefault(); 
        changeSort(e.currentTarget.lastChild.innerHTML.toLowerCase());
    }
    return (
        <div className='sortBar'>
            
            <div className='sortBar-container'>
                <div className='sortBar-buttons'>

                    <button onClick={handleClick}>
                        <Icon icon="hot-svgrepo-com" className="ic_hot icons" />

                        <span>Hot</span>
                    </button>
                    <button onClick={handleClick} >
                        <Icon icon="feed" className="ic_new icons" />
                        <span>New</span>
                    </button>
                    <button onClick={handleClick}>
                        <Icon icon="stats-bars2" className="ic_top icons" />
                        <span>Top</span>

                        
                    </button>

                </div>
                <div className='sortBar-empty'></div>
            </div>
        </div>

    )
}