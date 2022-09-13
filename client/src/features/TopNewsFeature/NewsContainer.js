import { truncTitle } from '../../utilities/utilities';


// Renders a piece of news 

export const NewsContainer = ({ preview, title, source, permalink }) => {

   

    return (
        <a target="_blank" rel="noreferrer" href={`${permalink}`} className="news-wrapper">
            <div className="news" style={{ background: "url(" + preview + ") center center / cover no-repeat transparent" }}>
                <div className="news-title-wrapper">
                    <div className="news-title">
                        <h4>{truncTitle(title)}</h4>
                        <div className="news-source flex-align-center">
                            
                            <p>{source}</p>
                        </div>


                    </div>
                </div>

            </div>
        </a>

    )
}

