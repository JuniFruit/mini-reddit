import { images } from '../../assets/images';
import './Post.css';

export const Post = () => {

    return (
        <div className='post-container'>
            <div className='vote-arrows-container'>
                <div className='vote-arrows'>
                    <a href='' className='arrow-up'>Up</a>
                    <span className='votes-number'>110.5K</span>
                    <a href='' className='arrow-down'>Down</a>
                </div>
            </div>
            <div className='post-content'>
                <div className='post-author'>
                    <p>Post created by UserName</p>
                </div>
                <div className='post-title'>
                    <h3>Some post title that can be very long</h3>
                </div>
                <div className='post-img-container'>
                    <img src={images.testImg} />
                </div>
            </div>
        </div>
    )
}