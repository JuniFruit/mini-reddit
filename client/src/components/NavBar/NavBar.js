import { useContext, useState } from "react";
import './NavBar.css';
import Icon from "../../assets/icons";
import { images } from "../../assets/images"
import { useSelector } from "react-redux"
import { selectToken } from '../Login/loginSlice';
import { ProfileInfo } from "../Profile/ProfileInfo";
import { SearchBar } from '../../features/SearchBar/SearchBar';
import { redirectToRedditLogin } from "../../utilities/utilities";
import { Link, useLocation } from 'react-router-dom'
import { MobileContext } from "../../app/App";


// Renders navigation bar

export const NavBar = () => {

    const [mobileMenuActive, setMobileMenuActive] = useState(false)
    const token = useSelector(selectToken)

    const isMobile = useContext(MobileContext);
    const location = useLocation();

    const toggleMenu = (e) => {
        e.preventDefault();

        setMobileMenuActive(!mobileMenuActive);
    }

    const renderProfile = () => {
        if (!token) return <button onClick={handleClick} className="login-button button">Log In</button>

        return <ProfileInfo />
    }
    const handleClick = () => {

        if (!token) {

            redirectToRedditLogin(location.pathname);
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
                            <span className="noselect mini-span">Mini</span>
                            <span className="noselect social-span">Social</span>
                        </Link>

                    </div>
                    <SearchBar />

                </div>

                {!isMobile
                    ?
                    <div className="loginButton-container">
                        {renderProfile()}
                    </div>
                    :
                    <div className="hamburger-menu">
                        <button onClick={toggleMenu} >
                            {!mobileMenuActive
                                ?
                                <Icon icon="menu3"></Icon>
                                :
                                <Icon icon="menu4"></Icon>
                            }
                        </button>
                        <div
                            className={mobileMenuActive ? "hamburger-menu-container hamburger-menu-container-active" : "hamburger-menu-container"}
                            onClick={() => setMobileMenuActive(false)}>

                            {renderProfile()}

                        </div>

                    </div>
                }
            </div>


        </div>
    )
}