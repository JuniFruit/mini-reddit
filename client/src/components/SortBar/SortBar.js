import './SortBar.css'
import Icon from '../../assets/icons'
import { Link } from 'react-router-dom'

export const SortBar = ({sort, subreddit}) => {

    return (
        <div className='sortBar'>
            
            <div className='sortBar-container'>
                <div className='sortBar-buttons'>

                    <Link to={subreddit ? `/r/${subreddit}/hot` : '/hot'} className={sort === 'hot' ? 'sortBar-button sortBar-button-active' : 'sortBar-button'} >
                        <Icon icon="hot-svgrepo-com" className="ic_hot icons" />

                        <span>Hot</span>
                    </Link>
                    <Link to={subreddit ? `/r/${subreddit}/new` : '/new'} className={sort === 'new' ? 'sortBar-button sortBar-button-active' : 'sortBar-button'} >
                        <Icon icon="feed" className="ic_new icons" />
                        <span>New</span>
                    </Link>
                    <Link to={subreddit ? `/r/${subreddit}/top` : '/top'} className={sort === 'top' ? 'sortBar-button sortBar-button-active' : 'sortBar-button'} >
                        <Icon icon="stats-bars2" className="ic_top icons" />
                        <span>Top</span>

                        
                    </Link>

                </div>
                <div className='sortBar-empty'></div>
            </div>
        </div>

    )
}