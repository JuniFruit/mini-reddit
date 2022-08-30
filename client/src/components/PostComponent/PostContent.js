import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import remarkToc from 'remark-toc'
import { truncTitle } from '../../utilities/utilities';
import { EmbeddedMedia } from './EmbeddedMedia';


export const PostContent = (props) => {

    const renderContent = () => {
        if (props.is_video === true) return <div className='post-media-container'>{renderPostVideo()}</div>;
        if (props.entire_data.media !== null) return <div className='post-media-container'><EmbeddedMedia data={props.entire_data} /></div>;
        if (props.post_hint === 'link') return renderLink();
        if (props.post_hint === 'image') return <div className='post-media-container'>{renderPostImage()}</div>;
        if (props.selfText.length > 1) return renderHtmlDescription();

    }

    const changePostStyles = () => {
        if (!props.singlePost) return;
        return {
            maxHeight: '100%',
            backgroundImage:  'linear-gradient(180deg, black, black)'
        }
    }

    
    const renderPostImage = () => {

        return (
            <div className='post-media-img-container' >
                <img   src={props.url} onError={(e) => { e.target.onerror = null; e.target.src = ' ' }} />
            </div>
        )
    }

    const renderPostVideo = () => {
        if (props.is_video === false) return '';

        return (
            <div className='video-container'>
                <video src={props.entire_data.secure_media.reddit_video.fallback_url} controls></video>
            </div>
        )

    }

    const renderHtmlDescription = () => {
        return (
            <div className='post-description'>
                <div className='description-data'  style={changePostStyles()} >
                    <ReactMarkdown remarkPlugins={[gfm, remarkToc]}>{props.selfText}</ReactMarkdown>
                </div>
            </div>
        )


    }

    const renderLink = () => {

        return (
            <div className='url' >
                <a href={props.url} target="_blank">
                    {truncTitle(props.url)}
                </a>
            </div>
        )
    }


    return renderContent();




}