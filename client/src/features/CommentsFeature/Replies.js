import { CommentsList } from "./CommentList"

import { useState } from "react";

export const Replies = ({ replies = [] }) => {
   
    const [amountToRender, setAmountToRender] = useState(1) // I decided to minimize amount of replies being rendered at once
    if (!replies) return;

    const filtered = replies.filter(child => child.kind !== 'more')
    const repliesToRender = filtered.slice(0, amountToRender)
    
    const renderMoreButton = () => {

        if (filtered.length === repliesToRender.length) return;
        
        return <button className="repliesMore-button" 
        onClick={(e) =>{e.preventDefault(); setAmountToRender(replies.length)}}>More replies</button>

    }
    
    return (
        <>
            <CommentsList comments={repliesToRender} />
            {renderMoreButton()}
        </>
        )
        
}