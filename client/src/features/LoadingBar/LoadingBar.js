import './LoadingBar.css'

import { selectIsSubListLoading } from '../../components/SideListing/subredditListSlice';
import { useSelector } from 'react-redux';
import { selectIsPostsLoading } from '../../components/PostComponent/postsSlice';
import { selectIsNewsLoading } from '../../features/TopNewsFeature/topNewsSlice';
import { selectIsSubredditDataLoading } from '../../features/subredditSlice';
import { selectIsUserLoading } from '../../components/Login/loginSlice';

// Renders loading bar at the bottom of the page when something is being fetched

export const LoadingBar = () => {

    const subsLoading = useSelector(selectIsSubListLoading);
    const postsLoading = useSelector(selectIsPostsLoading);
    const newsLoading = useSelector(selectIsNewsLoading);
    const subDataLoading = useSelector(selectIsSubredditDataLoading);
    const userLoading = useSelector(selectIsUserLoading);


    const renderLoadingBar = () => {
        const loadingStates = {
            subDataLoading,
            newsLoading,
            userLoading,
            postsLoading,
            subsLoading
        }

        if (Object.values(loadingStates).some(item => item === true)) {

            return (

                <div className="loadingBar-container">
                    <div className="loading-content">
                        <div className="loading-heading">
                            <h3>Loading...</h3>
                        </div>
                        <div className="loading-spinner">

                            <div className='spin'></div>
                            <div className='spin2'></div>


                        </div>
                    </div>
                </div>
            )
        };
    }

    return (
        <>
            {renderLoadingBar()}
        </>
    )
}