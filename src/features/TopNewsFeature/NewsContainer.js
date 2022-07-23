

export const NewsContainer = (props) => {


    return (
        <div className="news">
            <img alt="newsImage" src={props.data.img}></img>
            <h4>{props.data.headline}</h4>
        </div>
    )
}