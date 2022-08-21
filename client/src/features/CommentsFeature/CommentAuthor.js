

export const CommentAuthor = (props) => {

    return (
        <div className="comment-author">
            <div className="author-img-container">
                <img src={images.defaultCommunityImg} />
            </div>
            <span>Author</span>
            <span>Time</span>
        </div>
    )
}