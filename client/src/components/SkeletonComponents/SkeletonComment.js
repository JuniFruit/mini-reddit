import './Skeleton.css'

export const SkeletonComment = ({ amount = 1 }) => {

    const renderContent = () => {
        if (amount < 1) return;

        const array = new Array(amount);
        const node = (
            <div className="comment-container">


                <div className="comment-wrapper">
                    <div className="comment-author flex-align-center">
                        <div className="author-img-container">
                            <div className="skeleton skeleton-icon"></div>
                        </div>
                        <span className="skeleton skeleton-header"></span>

                    </div>
                    <div className="comment-body">
                        <p className="skeleton skeleton-header-big"></p>
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