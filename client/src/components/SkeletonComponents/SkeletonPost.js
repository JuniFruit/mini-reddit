import { useContext } from "react"
import { MobileContext } from "../../app/App"
import { PostVote } from "../PostComponent/PostVote"
import { SkeletonRenderer } from "./SkeletonRenderer"


export const SkeletonPost = ({ isMinified, amount }) => {

    /* eslint-disable */

    const isMobile = useContext(MobileContext);
    return (

        <SkeletonRenderer amount={amount}>
            <div className="posts">

                <div className='post-container'>
                    {isMinified || isMobile
                        ? null
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
                                    <div className="">
                                        <div className="">
                                            <div className="">
                                                <div className="skeleton skeleton-media-img" style={{ minHeight: "25rem" }}></div>
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
            </div>

        </SkeletonRenderer>

    )

}