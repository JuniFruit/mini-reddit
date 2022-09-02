import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import remarkToc from 'remark-toc'
import { truncTitle } from '../../utilities/utilities';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import { EmbeddedMedia } from './EmbeddedMedia';

const IMAGE_REGEX = /.\w{3,4}$/gm;


export const PostContent = (props) => {

    props.singlePost
        ?
        window.document.body.style.setProperty('--postMaxHeight', 'max-content')
        :
        window.document.body.style.setProperty('--postMaxHeight', '36.5rem')

    console.log(IMAGE_REGEX.test(props.entire_data.url))
    const renderContent = () => {
        if (props.is_video === true) return <div className='post-media-container'>{renderPostVideo()}</div>;
        if (props.entire_data.media !== null) return <div className='post-media-container'><EmbeddedMedia data={props.entire_data} /></div>;
        if (IMAGE_REGEX.test(props.entire_data.url) !== true) return renderLink();
        if (IMAGE_REGEX.test(props.entire_data.url)) return <div className='post-media-container'>{renderPostImage()}</div>;
        if (props.selfText.length > 1) return renderHtmlDescription();

    }

    const changePostStyles = () => {
        if (!props.singlePost) return;
        return {
            maxHeight: '100%',
            backgroundImage: 'linear-gradient(180deg, black, black)'
        }
    }


    const renderPostImage = () => {

        return (
            <div className='post-media-img-container' >
                <img src={props.url} onError={(e) => { e.target.onerror = null; e.target.src = ' ' }} />
            </div>
        )
    }

    const renderPostVideo = () => {

        return (
            <div className='video-player'>
                <VideoPlayer
                    videoSrc={props.entire_data.secure_media.reddit_video.fallback_url}
                    audioSrc={props.entire_data.secure_media.reddit_video.fallback_url.replace(/DASH_\d{1,5}/, 'DASH_audio')}
                    maxHeigth={340} />
            </div>
        )

    }

    const renderHtmlDescription = () => {
        return (
            <div className='post-description'>
                <div className='description-data' style={changePostStyles()} >
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