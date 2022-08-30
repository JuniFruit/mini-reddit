import { PostVote } from "../PostComponent/PostVote"
import './Skeleton.css'

export const SkeletonPost = ({ isMinified, amount }) => {
    const renderContent = () => {
        if (amount < 1) return;

        const array = new Array(amount);
        const node = (
            <div className='post-container'>
                {isMinified
                    ? ''
                    :
                    <div className='vote-arrows-container'>
                        <div className='vote-arrows'>
                            <PostVote votes={0} />
                        </div>
                    </div>}

                <div className='post-wrapper'>
                    <div className='post-header '>
                        <div className='post-author'>
                            <div className='post-author-subreddit '>
                                <div className="skeleton skeleton-icon"></div>


                            </div>
                            <p className="skeleton skeleton-header"></p>


                        </div>
                        <div className='post-title'>
                            <h3 className="skeleton skeleton-header-big"></h3>


                        </div>
                        <div className='post-content'>

                            {!isMinified
                                ?
                                <div className="post-media-container">
                                    <div className="post-media-container">
                                        <div className="">
                                            <div className="skeleton skeleton-media-img"></div>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className="post-description">
                                    <div className="description-data">
                                        <p className="skeleton skeleton-text"></p>
                                        <p className="skeleton skeleton-text"></p>
                                        <p className="skeleton skeleton-text"></p>
                                        <p className="skeleton skeleton-text"></p>
                                    </div>
                                </div>

                                }



                        </div>
                    </div>
                </div>
            </div>
        )
        return array.fill(node).map(node => node);
    }
    return (
        <>
            {renderContent()}
        </>
    )

}