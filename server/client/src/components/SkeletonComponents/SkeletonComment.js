import { SkeletonRenderer } from './SkeletonRenderer';

export const SkeletonComment = ({ amount }) => {

    

    return (
        <SkeletonRenderer amount={amount}>
            
            <div className="comment-container">


                <div className="comment-wrapper">
                    <div className="comment-author flex-align-center">
                        <div className="author-img-container">
                            <div style={{width: "2.3rem", heigth: "2.3rem"}} className="skeleton skeleton-icon"></div>
                        </div>
                        <span className="skeleton skeleton-header"></span>

                    </div>
                    <div className="comment-body">
                        <p className="skeleton skeleton-header-big"></p>
                    </div>

                </div>
            </div>

        </SkeletonRenderer>

    )

}