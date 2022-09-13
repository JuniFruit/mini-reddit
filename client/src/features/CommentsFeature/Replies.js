import { CommentsList } from "./CommentList"

import { useState } from "react";

export const Replies = ({ replies = [], changeLikesProp, addComment }) => {
   
    const [amountToRender, setAmountToRender] = useState(1) // I decided to minimize amount of replies being rendered at once
    if (!replies.length) return;

    const filtered = replies.filter(child => child?.kind !== 'more' && child !== null)
    const repliesToRender = filtered.slice(0, amountToRender)
    
    const renderMoreButton = () => {

        if (filtered.length === repliesToRender.length) return;
        
        return <button className="repliesMore-button" 
        onClick={(e) =>{e.preventDefault(); setAmountToRender(replies.length)}}>More replies</button>

    }
    
    return (
        <>
            <CommentsList comments={repliesToRender} changeLikesProp={changeLikesProp} addComment={addComment}/>
            {renderMoreButton()}
        </>
        )
        
}