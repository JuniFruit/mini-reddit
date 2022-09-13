import { useNavigate } from "react-router-dom"
import Icon from "../../assets/icons"
import './BackButton.css'


export const BackButton = () => {


    const navigate = useNavigate();

    const handleClick = () => {
        navigate(-1)

        // return a user to the post he was redirected from. Timeout is used to wait for components to render 
        setTimeout(() => {
            window.scrollTo(0, window.localStorage.prevPos)
           
        }, 2000)
        
    }
    return (
        
        <div className='back-button'>
            <button onClick={handleClick}>
                <Icon icon="arrow-left2" className="backBtn-icon"></Icon>
                <span>Back</span>
            </button>
        </div>
    )
}