
import { useLazyLoad } from "./useLazyLoad"

export const SubLoad = (props) => {
    const [ready, element] = useLazyLoad(props.parentContainer);



    return (

        <div ref={element} >
            {ready ? props.children : ''}
        </div>

    )
}