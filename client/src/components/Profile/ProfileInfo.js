import { selectUserData } from '../Login/loginSlice';
import { useSelector } from 'react-redux';
import Icon from '../../assets/icons';
import { DropdownMenu } from '../../features/Dropdown/DropdownMenu';
import './Profile.css';

// Renders profile info block at the top of the page 

export const ProfileInfo = () => {

    const profileData = useSelector(selectUserData);
    if (!Object.keys(profileData).length) return '';

    return (

        <div className='profile-container flex-align-center dropdown'>
            <div className='profile-content'>
                <div className='profile-icon'>
                    <img src={profileData.user.icon} onError={(e) => { e.target.onerror = null; e.target.src = ' ' }} />
                </div>
                <div className='profile-info'>
                    <span>{profileData.user.name}</span>
                    <div className='profile-karma flex-align-center'>
                        <Icon icon="trophy" className="ic_trophy"></Icon>
                        <p>{profileData.user.total_karma} karma</p>
                    </div>
                </div>
            </div>

            <DropdownMenu>
                <div>
                    <button>
                        <Icon icon="profile" className="post-icons"></Icon>
                        <span>Profile</span>
                    </button>

                </div>
                <div>
                    <button>
                        <Icon icon="exit" className="post-icons"></Icon>
                        <span>Log out</span>
                    </button>
                </div>
            </DropdownMenu>
            
        </div>
    )
}