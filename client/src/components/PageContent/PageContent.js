import { useParams } from 'react-router-dom';
import './PageContent.css'
import { CommunityPage } from './CommunityPage';
import { LoadPosts } from "../PostComponent/LoadPosts"
import { SideListing } from "../SideListing/SideListing"
import { BackToTopButton } from '../../features/BackToTopButton/BackToTopButton';
import { setStyles } from '../../utilities/utilities';

//Renders different parts of page or pages depends on where a user is 

export const PageContent = () => {

    let { sort, subreddit } = useParams();
    if (sort === undefined) sort = 'hot';

    console.log(sort)
    const renderPage = () => {
        if (subreddit) return <CommunityPage sort={sort} subreddit={subreddit} backToTop={backToTop} />;
        
        return;
    }

   

    const backToTop = () => {
        window.scrollTo({
            top: 0

        })
    }
 



    return (
        <>
            {!subreddit && setStyles()}
            
            <div className='container'>
                {renderPage()}
                <div className='page-container content-container'>
                    {!subreddit && <h4>Popular posts</h4>}
                    <div className='content-wrapper'>
                        
                        <LoadPosts sort={sort} subreddit={subreddit} backToTop={backToTop} />

                        <div className='side-listing'>
                            <div>
                                <SideListing subreddit={subreddit} backToTop={backToTop} />

                            </div>
                            <BackToTopButton />

                        </div>

                    </div>
                </div>


            </div>

        </>

    )
}

