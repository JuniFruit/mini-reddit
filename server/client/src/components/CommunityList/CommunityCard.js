import { Link } from "react-router-dom"
import { images } from "../../assets/images";
import { truncLargeNumber } from "../../utilities/utilities";
import { truncTitle } from "../../utilities/utilities";
import { useNavigate } from "react-router-dom";


export const CommunityCard = (props) => {

    /* eslint-disable */
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`${props.url}`)
    }

    const backToTop = () => {
        window.scrollTo(0, 0)
    }

    return (
        <>
            <div onClick={handleClick} className="communityCard-container">

                <div className="community-description flex-align-center">
                    <img className="community-img"
                        src={props.icon_img || props.community_icon}
                        onError={(e) => { e.target.onerror = null;  e.target.src=images.defaultCommunityImg}}
                    ></img>
                    <div>
                        <div className="community-link-container flex-align-center">
                            <div className="community-name ">
                                <Link to={`${props.url}`}><span>{props.name_prefixed}</span></Link>
                            </div>
                            <p className='community-dot'>•</p>
                            <div className='community-members'>
                                <p>{truncLargeNumber(props.members)} <span>Members</span></p>
                            </div>
                        </div>
                        <div className="community-description-body">
                            <p>{truncTitle(props.description, 100)}</p>
                        </div>

                    </div>
                </div>

                <div className="subreddit-item-button">
                    <Link to={`${props.url}`} onClick={backToTop} className="button">
                        View
                    </Link>
                </div>

            </div>

        </>

    )
}