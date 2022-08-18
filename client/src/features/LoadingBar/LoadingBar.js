import './LoadingBar.css'

export const LoadingBar = () => {

    return (

        <div className="loadingBar-container">
            <div className="loading-content">
                <div className="loading-heading">
                    <h3>Loading...</h3>
                </div>
                <div className="loading-spinner">

                    <div className='spin'></div>
                    <div className='spin2'></div>


                </div>
            </div>
        </div>
    )
}