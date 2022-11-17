import Icon from "../../assets/icons"


export const CommentNoList = () => {

    return (

        <div className="nocomments-container flex-center noselect">
            <div className="nocomments-content ">
                <h2>No comments yet</h2>
                <Icon icon="quill" className="quill-icon"></Icon>
                <h4>Be first to comment</h4>
            </div>
        </div> 
    )
}