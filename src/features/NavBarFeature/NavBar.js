import { SearchBar } from "../../components/SearchBar"
import './NavBar.css'
import { images } from "../../assets/images"

export const NavBar = (props) => {


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
                    <button className="login-button button">Log In</button>
                </div>
            </div>


        </div>
    )
}