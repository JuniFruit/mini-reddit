import parse from 'html-react-parser'
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm'
import { truncTitle } from '../../utilities/utilities';
import { EmbeddedMedia } from './EmbeddedMedia';


export const PostContent = (props) => {

    const renderContent = () => {
        if (props.is_video === true) return <div className='post-media-container'>{renderPostVideo()}</div>;
        if (props.entire_data.media !== null) return <div className='post-media-container'><EmbeddedMedia data={props.entire_data} /></div>;
        if (props.selfText !== '') return renderHtmlDescription();
        if (props.post_hint === 'link') return renderLink();
        if (props.post_hint === 'image') return <div className='post-media-container'>{renderPostImage()}</div>;

        
    }




    const renderPostImage = () => {
        return (
            <div className='post-media-img-container'>
                <img src={props.url} onError={(e) => { e.target.onerror = null; e.target.src = ' ' }} />
            </div>
        )
    }

    const renderPostVideo = () => {
        if (props.is_video === false) return '';

        return <video src={props.entire_data.secure_media.reddit_video.fallback_url} controls></video>

    }

    const renderHtmlDescription = () => {
        return (
            <div className='post-description'>
                <div className='description-data'>
                    <ReactMarkdown remarkPlugins={[gfm]}>{parse(props.selfText)}</ReactMarkdown>
                </div>
            </div>
        )


    }

    const renderLink = () => {

        return (
            <div className='url' >
                <a href={parse(props.url)} target="_blank">
                    {truncTitle(props.url)}
                </a>
            </div>
        )
    }

    
    return renderContent();

    
        
    
}