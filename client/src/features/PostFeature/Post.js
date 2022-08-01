import  parse  from 'html-react-parser'

export const Post = (props) => {

    // replaces all the html entities with regular signs to render it in react
    const renderHtmlDescription = () => {
       if (!props.selfText) return '';
       const regExpLessSign = /&lt;/ig;
       const regExpGreaterSign = /&gt;/ig;
       const regExpApostrophe = /&amp;#39;/ig;
       const regExpQuotes = /&amp;quot;/ig
       const html = props.selfText.replaceAll(regExpLessSign, '<');
       const html2 = html.replaceAll(regExpGreaterSign, '>');
       const html3 = html2.replaceAll(regExpApostrophe, '\'');
       const html4 = html3.replaceAll(regExpQuotes, '\"');
     
       return html4
    } 

    return (
       
            
            <div className='post-container'>
                <div className='vote-arrows-container'>
                    <div className='vote-arrows'>
                        <a href='' className='arrow-up'>Up</a>
                        <span className='votes-number'>{props.votes} </span>
                        <a href='' className='arrow-down'>Down</a>
                    </div>
                </div>
                <div className='post-content'>
                    <div className='post-author'>
                        <p>Post created by {props.byUser}</p>
                    </div>
                    <div className='post-title'>
                        <h3>{parse(props.title)}</h3>
                    </div>
                    <a className='post-description' href="#">
                        <div className="description-data">
                        
                          {parse(renderHtmlDescription())}
                          
                        </div>
                        
                    </a>
                    <a className='post-img-container' href="#">
                        <img src={props.url} onError={(e) => {e.target.onerror = null; e.target.src=' '}} />
                    </a>
                </div>
            
            </div>

    )
}