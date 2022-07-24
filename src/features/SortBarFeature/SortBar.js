import './SortBar.css'
import { images } from '../../assets/images'

export const SortBar = () => {

    return (
        <div className='sortBar-container'>
            <div className='sortBar-buttons'>
                <a href='' className='sortBar-button' style={{background: "url" + '(' + images.hotImg + ")" + "center left / contain no-repeat #0000000b"}}>
                    Hot
                
                </a>
                <a href='' className='sortBar-button' style={{background: "url" + '(' + images.hotImg + ")" + "center left / contain no-repeat #0000000b"}}> Test </a>
                <a href='' className='sortBar-button' style={{background: "url" + '(' + images.hotImg + ")" + "center left / contain no-repeat #0000000b"}}> Test </a>

            </div>
            <div className='sortBar-empty'></div>
        </div>
    )
}