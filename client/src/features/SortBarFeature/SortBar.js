import './SortBar.css'
import { images } from '../../assets/images'
import Icon from '../../assets/icons'

export const SortBar = () => {

    return (
        <div className='sortBar'>
            <h4>Popular posts</h4>
            <div className='sortBar-container'>
                <div className='sortBar-buttons'>

                    <a href='' className='sortBar-button' >
                        <Icon icon="hot-svgrepo-com" className="ic_home icons" />

                        <span>Hot</span>
                    </a>
                    <a href='' className='sortBar-button' >
                        <Icon icon="play" className="ic_play icons" />
                        <span>Test</span>
                    </a>
                    <a href='' className='sortBar-button' >
                        <span>Everywhere</span>
                        <Icon icon="compass" className="ic_location icons" />
                        
                    </a>

                </div>
                <div className='sortBar-empty'></div>
            </div>
        </div>

    )
}