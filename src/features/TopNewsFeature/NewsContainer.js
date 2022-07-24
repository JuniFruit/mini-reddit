

export const NewsContainer = (props) => {

    
    return (
        <a className="news-wrapper">
            <div className="news" style={{background: "url" + "(" + props.data.img + ")" + "center center / cover no-repeat transparent"}}>
                
                <h4>{props.data.headline}</h4>
            </div>
        </a>

    )
}