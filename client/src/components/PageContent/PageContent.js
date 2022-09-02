import { useParams } from 'react-router-dom';
import './PageContent.css'
import { CommunityPage } from './CommunityPage';
import { SideListing } from "../SideListing/SideListing"
import { BackToTopButton } from '../../features/BackToTopButton/BackToTopButton';
import { LoadPosts } from '../PostComponent/LoadPosts';
import { setStyles } from '../../utilities/utilities';
import { useState } from 'react';



//Renders different parts of page or pages depends on where a user is 

export const PageContent = () => {

    const [sort, setSort] = useState('hot');

    const changeSort = (value) => {
        setSort(value)
    }

    let {subreddit } = useParams();
    
    const backToTop = () => {
        window.scrollTo({
            top: 0

        })
    }


    return (
        <>
            {!subreddit && setStyles()}

            <div className='container'>
                {subreddit ? <CommunityPage sort={sort} subreddit={subreddit} backToTop={backToTop} /> : ''}
                <div className='page-container content-container'>
                    {!subreddit && <h4>Popular posts</h4>}
                    <div className='content-wrapper'>
                        
                        <LoadPosts sort={sort} subreddit={subreddit} backToTop={backToTop} changeSort={changeSort}/>

                        <div className='side-listing'>
                            <div>
                                <SideListing subreddit={subreddit} backToTop={backToTop} singlePost={false} />

                            </div>
                            <BackToTopButton />

                        </div>

                    </div>
               
                </div>


            </div>

        </>

    )
}

