
import './ErrorPopup.css';



export const ErrorPopup = ({ errMsg }) => {

    if (!errMsg) return;
    if (errMsg.includes('The user aborted a request.')) return;
    const handleClose = (e) => {
        
        e.currentTarget.parentNode.parentNode.style.setProperty('display', 'none')
    }

    const renderHandlingAdvice = () => {
        if (errMsg?.includes('FetchError')) {
            return (
                <div className='error-handling'>
                    <span>Try to check your internet connection</span>
                </div>
            )
        }
    }


    return (
        <div className='error-wrapper'>
            
            <div className="error-content">
                
                <h4>Error</h4>
                <p>{errMsg}</p>

            </div>
            {renderHandlingAdvice()}
            <div className="error-close">
                <button onClick={handleClose}>X</button>
            </div>
        </div>

    )
}