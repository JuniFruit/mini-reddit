import Icon from "../../assets/icons"
import { useLocation } from "react-router-dom"
import './PageContent.css'


export const NotFound = () => {

    const location = useLocation();
    return (
        <div className="notfound-page noselect">
            <h1>Oops...We couldn't found the page</h1>
            <span>404</span>
            <Icon icon="binoculars"></Icon>
            <a href={`https://www.reddit.com${location.pathname}`} target="_blank">Try to lookup here</a>
        </div>
    )
}