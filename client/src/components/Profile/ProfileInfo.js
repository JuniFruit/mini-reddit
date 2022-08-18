import { selectUserData } from '../Login/loginSlice';
import { useSelector } from 'react-redux';
import parse from 'html-react-parser'
import Icon from '../../assets/icons';
import './Profile.css';


export const ProfileInfo = () => {

    const profileData = useSelector(selectUserData);
    if (!Object.keys(profileData).length) return '';

    return (

        <div className='profile-container flex-align-center'>
            <div className='profile-content'>
                <div className='profile-icon'>
                    <img src={parse(profileData.user.icon)} onError={(e) => {e.target.onerror = null; e.target.src = ' '}}/>
                </div>
                <div className='profile-info'>
                    <span>{profileData.user.name}</span>
                    <div className='profile-karma flex-align-center'>
                        <Icon icon="trophy" className="ic_trophy"></Icon>
                        <p>{profileData.user.total_karma} karma</p>
                    </div>
                </div>
            </div>
            <button className=''><Icon icon="circle-down" className="ic_circle-down post-icons"></Icon></button>
        </div>
    )
}