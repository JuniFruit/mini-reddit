import { selectUserData } from '../Login/loginSlice';
import { useSelector, useDispatch } from 'react-redux';
import Icon from '../../assets/icons';
import { DropdownMenu } from '../../features/Dropdown/DropdownMenu';
import './Profile.css';
import { useContext } from 'react';
import { MobileContext } from '../../app/App';
import { useNavigate } from 'react-router-dom';
import { logout } from '../Login/loginSlice';
// Renders profile info block at the top of the page 

export const ProfileInfo = () => {
    /* eslint-disable */
    const dispatch = useDispatch();
    const isMobile = useContext(MobileContext);
    const profileData = useSelector(selectUserData);
    const navigate = useNavigate();

    const navigateToProfile = () => {
        window.open(`https://www.reddit.com/user/${profileData.name}/`, "_blank")
    }

    const renderButtons = () => {
        return (
            <>
                <div>
                    <button onClick={navigateToProfile}>
                        <Icon icon="profile" className="post-icons"></Icon>
                        <span>Profile</span>
                    </button>

                </div>
                <div>
                    <button onClick={(e) => {e.preventDefault(); navigate('r/popular')}}>
                        <Icon icon="rocket" className="post-icons"></Icon>
                        <span>r/Popular</span>
                    </button>

                </div>
                <div>
                    <button onClick={(e) => {e.preventDefault(); dispatch(logout(window.localStorage.id))}}>
                        <Icon icon="exit" className="post-icons"></Icon>
                        <span>Log out</span>
                    </button>
                </div>
            </>

        )
    }
    if (!Object.keys(profileData).length) return null;
  
    return (

        <div className='profile-container dropdown'>
            <div className='profile-content'>
                <div className='profile-icon'>
                    <img src={profileData.icon} onError={(e) => { e.target.onerror = null; e.target.src = ' ' }} />
                </div>
                {isMobile
                    ?
                    null
                    :
                    <div className='profile-info'>
                        <span>{profileData.name}</span>
                        <div className='profile-karma flex-align-center'>
                            <Icon icon="trophy" className="ic_trophy"></Icon>
                            <p>{profileData.total_karma} karma</p>
                        </div>
                    </div>
                }
            </div>
            {isMobile
                ?
                <>
                    <span>{profileData.name}</span>
                    <div className='profile-karma flex-align-center'>
                        <Icon icon="trophy" className="ic_trophy"></Icon>
                        <p>{profileData.total_karma} karma</p>
                    </div>
                    {renderButtons()}
                </>

                :
                null

            }


            {isMobile
                ?
                null
                :
                <DropdownMenu>
                    {renderButtons()}
                </DropdownMenu>
            }

        </div>
    )
}