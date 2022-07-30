import {useState } from 'react';
import { SearchBar } from "../../components/SearchBar/SearchBar"
import './NavBar.css'
import { images } from "../../assets/images"
import { getAuthorized } from "../../utilities/auth"

export const NavBar = (props) => {
    const [loggedIn, setLoggedIn] = useState(false);

    const renderButton = () => {
        if (loggedIn) return <button onClick={handleClick} className="login-button button">Log Out</button>
        if (!loggedIn) return <button onClick={handleClick} className="login-button button">Log In</button>
    }
    const handleClick = () => {

        if (!loggedIn) {
            window.location.href = `https://www.reddit.com/api/v1/authorize?client_id=N_FuvhLdY7m1D5QjJ6YRXA&response_type=code&state=test&redirect_uri=http://localhost:3000/&duration=temporary&scope=identity`
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
                    {renderButton()}
                </div>
            </div>


        </div>
    )
}