import { SubredditList } from '../SideListing/SubredditList';
import { useParams } from 'react-router-dom';
import './PageContent.css'

import { LoadPosts } from '../PostComponent/LoadPosts';



export const PageContent = () => {

    let { sort, subreddit } = useParams();
    if (sort === undefined) sort = 'hot';



    const backToTop = () => {
        window.scrollTo({
            top: 0

        })
    }

    

    return (
        <div className='content-container'>
            <h4> Popular posts </h4>
            <div className='content-wrapper'>
                <LoadPosts sort={sort} subreddit={subreddit} />

                <div className='side-listing'>
                    <div className='side-listing-container'>
                        <SubredditList />
                        
                    </div>
                    <div className='back-top-button'>
                        <button onClick={backToTop} className='button'>Back to Top</button>
                    </div>
                    
                </div>
                
            </div>
            
        </div>
    )
}