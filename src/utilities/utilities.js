

export const numberOfNewsToShow = () => {

    const width = window.innerWidth;

    if (width > 900) return 4;
    if (width < 900 && width > 730) return 3;
    if (width < 730 && width > 500) return 2;
    if (width < 500) return 1;

}


/* Making resizing happening less often */

export const debounce = (func, ms) => {
    let timer;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null;
            func.apply(this)
        }, ms)
    }
}