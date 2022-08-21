import './BackToTopButton.css'

export const BackToTopButton = () => {

    const backToTop = () => {
        window.scrollTo({
            top: 0

        })
    }

    return (
        <div className='back-top-button'>
            <button onClick={backToTop} className='button'>Back to Top</button>
        </div>
    )
}