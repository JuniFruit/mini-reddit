import { useEffect, useState, useRef } from "react";

/**
 @param parentContainer - className of the parent container where observer works (example './container')
*/

export const useLazyLoad = (parentContainer) => {

    const [ready, setReady] = useState(false);
    const element = useRef();
    
    useEffect(() => {
        let observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setReady(true);
                    observer.unobserve(element.current)
                } else {
                    
                }
            }, {
                root: document.querySelector(parentContainer),
                
                                             
            })

        })
        observer.observe(element.current)
    }, [])
    return [ready, element]
}