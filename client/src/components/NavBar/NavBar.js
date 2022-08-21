import { SearchBar } from "../../features/SearchBar/SearchBar"
import './NavBar.css'
import { images } from "../../assets/images"
import { useSelector } from "react-redux"
import { selectIsLogged } from '../Login/loginSlice';
import { ProfileInfo } from "../Profile/ProfileInfo";
import { redirectToRedditLogin } from "../../utilities/utilities";
import { Link } from 'react-router-dom'

// Renders navigation bar

export const NavBar = () => {
    const loggedIn = useSelector(selectIsLogged)
 
    
    const renderProfile = () => {
        if (!loggedIn) return <button onClick={handleClick} className="login-button button">Log In</button>

        return <ProfileInfo />
    }
    const handleClick = () => {

        if (!loggedIn) {
            redirectToRedditLogin();
        }


    }
    return (
        <div className="header">
            <div className="header-container">
                <div className="logo-searchBarContainer">
                    <div className="logo-wrapper">
                        <Link to={'/'} className="logo-container char">
                            <img alt="logo" src={images.logoChar} className="logo"></img>
                        </Link>
                        <Link to={'/'} className="logo-container reddit flex-align-center">
                            <span>Mini</span>
                            <span>Social</span>
                        </Link>
                        
                    </div>
                    <SearchBar />
             
                </div>
                <div className="loginButton-container">
                    {renderProfile()}
                </div>
            </div>


        </div>
    )
}