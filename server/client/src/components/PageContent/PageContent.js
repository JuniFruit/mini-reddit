import { useParams } from 'react-router-dom';
import './PageContent.css'
import { CommunityPage } from './CommunityPage';
import { SideListing } from "../SideListing/SideListing"
import { BackToTopButton } from '../../features/BackToTopButton/BackToTopButton';
import { LoadPosts } from '../PostComponent/LoadPosts';
import { setStyles } from '../../utilities/utilities';
import { useContext, useState, useRef } from 'react';
import { MobileContext } from '../../app/App';
import Icon from '../../assets/icons';



//Renders different parts of page or pages depends on where a user is 

export const PageContent = () => {

    /* eslint-disable */

    const sideListing = useRef();

    const isMobile = useContext(MobileContext);
    const [sort, setSort] = useState('hot');

    const changeSort = (value) => {
        setSort(value)
    }

    let { subreddit } = useParams();



    const backToTop = () => {
        window.scrollTo({
            top: 0

        })
    }

    const toggleMobileSideListing = (e) => {
        e.preventDefault();
        if (!isMobile) return;    
        sideListing.current.classList.toggle('side-listing-active')
    }

    return (
        <>
            {!subreddit || subreddit === 'popular' ? setStyles() : null }
            {isMobile &&
                <button onClick={toggleMobileSideListing}
                    className='communities-mobile-btn'>

                    <Icon icon="eject" className="icons"></Icon>
                </button>
            }
            <div className='container'>
                {subreddit && subreddit !== 'popular'
                    ?
                    <CommunityPage sort={sort} subreddit={subreddit} backToTop={backToTop} />
                    :
                    null
                }
                <div className='page-container content-container'>
                    {!subreddit && <h4>Popular posts</h4>}
                    <div className='content-wrapper'>


                        <LoadPosts sort={sort} subreddit={subreddit} backToTop={backToTop} changeSort={changeSort} />


                        <div
                            ref={sideListing}
                            className='side-listing'
                            onClick={toggleMobileSideListing}>

                            <SideListing subreddit={subreddit} backToTop={backToTop} singlePost={false} />


                            <BackToTopButton isMobile={isMobile} />

                        </div>

                    </div>

                </div>


            </div>

        </>

    )
}

