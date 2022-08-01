import { SearchBar } from "../../components/SearchBar/SearchBar"
import './NavBar.css'
import { images } from "../../assets/images"
import { useSelector } from "react-redux"
import { selectIsLogged } from '../../components/Login/loginSlice';



export const NavBar = () => {
    const loggedIn = useSelector(selectIsLogged)
    console.log(`Logged value is ${loggedIn}`)
      
    const scope = 'history edit identity privatemessages wikiread flair'

    

    const renderButton = () => {
        
        if (loggedIn) return <button onClick={handleClick} className="login-button button">Log Out</button>
        if (!loggedIn) return <button onClick={handleClick} className="login-button button">Log In</button>
    }
    const handleClick = () => {

        if (!loggedIn) {
            window.location.href = `https://www.reddit.com/api/v1/authorize?client_id=N_FuvhLdY7m1D5QjJ6YRXA&response_type=code&state=test&redirect_uri=http://localhost:3000/reddit_login&duration=temporary&scope=${scope}`
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