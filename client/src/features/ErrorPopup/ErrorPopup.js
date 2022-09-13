
import './ErrorPopup.css';
import React from 'react';


export const ErrorPopup = ({ errMsg }) => {

    if (!errMsg) return null;
    if (errMsg.includes('The user aborted a request.')) return null;

    const handleClose = (e) => {
        
        e.currentTarget.parentNode.parentNode.style.setProperty('display', 'none')
    }
    


    return (
        <div className='error-wrapper'>
            
            <div className="error-content">
                
                <h4>Error</h4>
                <p>{errMsg}</p>

            </div>       
            <div className="error-close">
                <button onClick={handleClose}>X</button>
            </div>
        </div>

    )
}