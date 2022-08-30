import parse from 'html-react-parser'
import { TwitterTweetEmbed } from 'react-twitter-embed';

// Renders embedded media within a post

export const EmbeddedMedia = ({data}) => {

   

    const renderEmbeddedMedia = () => {
        
        if (!Object.keys(data.media).length) return '';
        if (!data.media.type) return '';

        if (data.media.type.includes('twitter')) return <TwitterTweetEmbed tweetId={data.media.oembed.url?.split('/')[5]} />;
        if (data.media.type.includes('youtube')) return parse(data.media.oembed.html);

        
    }

    return (
        <>
          
            {renderEmbeddedMedia()}
 
        </>
            
      
    )

}