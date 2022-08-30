
import { useEffect, useState } from "react"
import { debounce } from "../utilities/utilities"

/**
 * Returns true if reached the bottom of the page
 * @param paginateOffset sets offset of the bottom. Uses float number idicating percent (default 0.1)
 
 */

export const usePaginate = (paginateOffset = 0.1) => {
    const [loadMore, setLoadMore] = useState(false)

    useEffect(() => {
       
        const handleScroll = () => {
            
            if (window.document.body.scrollHeight - (window.scrollY + window.innerHeight) < (window.document.body.scrollHeight * paginateOffset)) {
                
                setLoadMore(true)
                
                return;

            }

        }
        window.addEventListener('scroll', debounce(handleScroll), 1000);

        return () => {
            setLoadMore(false)
            
            window.removeEventListener('scroll', handleScroll);
            
            
        }
    })

    return [loadMore]
}