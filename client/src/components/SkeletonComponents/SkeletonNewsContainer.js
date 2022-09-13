import { SkeletonRenderer } from "./SkeletonRenderer"


export const SkeletonNewsContainer = ({ amount }) => {



    return (

        <SkeletonRenderer amount={amount}>
            <div className="news-wrapper">
                <div className="news" >
                    <div className="news-title-wrapper">
                        <div className="news-title">
                            <h4 className="skeleton skeleton-header-big"> </h4>
                            <div className="news-source">

                                <p className="skeleton skeleton-header"></p>
                            </div>


                        </div>
                    </div>

                </div>
            </div>
        </SkeletonRenderer>
    )

}