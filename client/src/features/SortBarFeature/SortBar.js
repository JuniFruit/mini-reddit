import './SortBar.css'
import Icon from '../../assets/icons'
import { Link } from 'react-router-dom'

export const SortBar = () => {

    return (
        <div className='sortBar'>
            
            <div className='sortBar-container'>
                <div className='sortBar-buttons'>

                    <Link to={'/hot'} className='sortBar-button' >
                        <Icon icon="hot-svgrepo-com" className="ic_home icons" />

                        <span>Hot</span>
                    </Link>
                    <Link to={'/new'} className='sortBar-button' >
                        <Icon icon="play" className="ic_play icons" />
                        <span>New</span>
                    </Link>
                    <Link to={'/top'} className='sortBar-button' >
                        <span>Top</span>
                        <Icon icon="compass" className="ic_location icons" />
                        
                    </Link>

                </div>
                <div className='sortBar-empty'></div>
            </div>
        </div>

    )
}