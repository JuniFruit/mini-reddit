import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import remarkToc from 'remark-toc'

export const CommentBody = (props) => {

    return (
        <div className="comment-body">
            <ReactMarkdown remarkPlugins={[gfm, remarkToc]}>{props.body}</ReactMarkdown>
        </div>
    )
}