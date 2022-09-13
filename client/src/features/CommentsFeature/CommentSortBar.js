import { useContext } from "react";
import { MobileContext } from "../../app/App";
import { DropdownMenu } from "../Dropdown/DropdownMenu";

const SORT_BUTTONS = ['Top', 'Random', 'New', 'Old', 'Controversial'];

export const CommentSortBar = ({ changeCommentSort, commentSort }) => {


    const isMobile = useContext(MobileContext);

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        changeCommentSort(e.currentTarget.innerHTML.toLowerCase())

    }

    const renderSortButtons = () => {
        return SORT_BUTTONS.map(btn => {
            return (
                <div key={btn}>
                    <button onClick={handleClick}>{btn}</button>
                </div>
            )
        })


    }



    return (
        <>

            {isMobile
                ?
                <div className="comment-sortBar flex-align-center dropdown">
                    <div style={{marginLeft: ".5rem"}}>
                        <button style={{fontSize: ".9rem"}} className="flex-align-center">
                            Sort by {commentSort}

                        </button>
                    </div>

                    <DropdownMenu>
                        {renderSortButtons()}
                    </DropdownMenu>




                </div>
                :
                <div className="comment-sortBar flex-align-center">
                    {renderSortButtons()}

                </div>

            }
        </>

    )
}