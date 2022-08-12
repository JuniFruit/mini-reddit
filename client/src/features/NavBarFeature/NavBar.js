import { SearchBar } from "../../components/SearchBar/SearchBar"
import './NavBar.css'
import { images } from "../../assets/images"
import { useSelector } from "react-redux"
import { selectIsLogged } from '../../components/Login/loginSlice';
import { ProfileInfo } from "../../components/Profile/ProfileInfo";
import { redirectToRedditLogin } from "../../utilities/utilities";



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
                        <div className="logo-container char">
                            <img alt="logo" src={images.logoChar} className="logo"></img>
                        </div>
                        <div className="logo-container reddit">
                            <img alt="logo" src={images.logoReddit} className="logo"></img>
                        </div>
                        
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