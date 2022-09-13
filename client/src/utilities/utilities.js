/* eslint-disable */

/* Determines how many news containers will be shown in Top news section */


export const numberOfNewsToShow = () => {

    const width = window.innerWidth;

    if (width > 900) return 4;
    if (width < 900 && width > 730) return 3;
    if (width < 730 && width > 500) return 2;
    if (width < 500) return 1;

}

export const randomNum = (num) => {
    return Math.floor(Math.random() * num);
}


/**
 * 
 * @param rangeLength length of a random range you want to get. For instance, if you want to get a range that starts at
 * 5 and ends at 9 you'll specify rangeLength 4;
 * @param  boundary max length;
 * @returns [rangeStart, rangeEnd] = postitve integers;
 */

export const randomPositiveRange = (rangeLength, boundary) => {

    // check if max size is bigger than desired length;
    if (boundary < rangeLength) return;

    const a = randomNum(boundary);
    const b = randomNum(boundary);

    const difference = (a * - 1) - (b * - 1);
    if (Math.abs(difference) === rangeLength) {

        const rangeStart = Math.min(a, b);
        const rangeEnd = Math.max(a, b);
        return [rangeStart, rangeEnd]
    } else {
        return randomPositiveRange(rangeLength, boundary);
    }
}


/* Making resizing happening less often (not used)*/

export const debounce = (func, ms = 500) => {
    let timer;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null;
            func.apply(this)
        }, ms)
    }
}

/* Converts server time and returns how much time elapsed */

export const elapsedTime = (serverUTC) => {

    const serverMillisecondsUTC = serverUTC * 1000;
    const currentDate = new Date();

    const elapsedSeconds = Math.floor((currentDate - serverMillisecondsUTC) / 1000)
    const elapsedMinutes = Math.floor(elapsedSeconds / 60);
    const elapsedHours = Math.floor(elapsedMinutes / 60);
    const elapsedDays = Math.floor(elapsedHours / 24);
    const elapsedWeeks = Math.floor(elapsedDays / 7);
    const elapsedMonths = Math.floor(elapsedWeeks / 4);
    const elapsedYears = Math.floor(elapsedMonths / 12);

    if (elapsedSeconds < 60) return `just now`;
    if (elapsedMinutes < 60) return `${elapsedMinutes} minute${pluralize(elapsedMinutes)} ago`;
    if (elapsedHours < 24) return `${elapsedHours} hour${pluralize(elapsedHours)} ago`;
    if (elapsedDays < 7) return `${elapsedDays} day${pluralize(elapsedDays)} ago`;
    if (elapsedWeeks < 4) return `${elapsedWeeks} week${pluralize(elapsedWeeks)} ago`;
    if (elapsedMonths < 12) return `${elapsedMonths} month${pluralize(elapsedMonths)} ago`;

    return `${Math.floor(elapsedYears)} year${pluralize(elapsedYears)} ago`;


}

const pluralize = (num) => {

    if (num > 1) return 's';
    return '';
}


export const truncLargeNumber = (num) => {
    if (Math.floor(num) > 1000000) {
        return `${(num / 1000000).toFixed(1)}M`
    }
    if (Math.floor(num) > 1000) {
        return `${(num / 1000).toFixed(1)}K`;
    }
    return num;
}

export const truncTitle = (title, maxSize = 50) => {

    if (title.length > maxSize) {
        const trimmed = title.slice(0, maxSize).concat('...');
        return trimmed
    }
    return title
}

/* Redirects user to reddit to login user */

export const redirectToRedditLogin = (location) => {

    const scope = 'history identity mysubreddits vote submit wikiread read report subscribe flair'
    window.location.href = `https://www.reddit.com/api/v1/authorize?client_id=N_FuvhLdY7m1D5QjJ6YRXA&response_type=code&state=test&redirect_uri=http://localhost:3000/reddit_login&duration=temporary&scope=${scope}`;

    // Used to memo current location to navigate back to the same page after login
    window.sessionStorage.setItem('currentHref', location)
}


/* Changes root color variables */

export const setStyles = (color, backgroundColor) => {

    if (!color) return resetStyles();
    let mainColor = color;
    let bgColor = backgroundColor;
    if (mainColor.length === 0) return;
    if (bgColor.length === 0) bgColor = mainColor;
    // '#cfcfcf'

    window.document.documentElement.style.setProperty('--buttonMainColor', mainColor);
    window.document.documentElement.style.setProperty('--buttonMainOnHoverColor', `${mainColor}87`);
    window.document.documentElement.style.setProperty('--mainBGcolor', `${bgColor}74`);
}

/* Changes root color variables back to original */

export const resetStyles = () => {
    window.document.documentElement.style.setProperty('--buttonMainColor', '#1fb51f');
    window.document.documentElement.style.setProperty('--buttonMainOnHoverColor', '#1fb51f87');
    window.document.documentElement.style.setProperty('--mainBGcolor', '#3679321c');
}


/* Duration time formatting  */

const zeroFormatting = new Intl.NumberFormat(undefined, { minimumIntegerDigits: 2 })

export const timeForamatting = (value) => {

    if (!value) return `00:00`
    const seconds = Math.floor(value % 60);
    const minutes = Math.floor(value / 60) % 60;
    const hours = Math.floor(value / 3600);

    if (hours === 0) return `${minutes}:${zeroFormatting.format(seconds)}`;
    return `${hours}:${zeroFormatting.format(minutes)}:${zeroFormatting.format(seconds)}`
}



// Copy to clipboard function for iOS

export const copy = (string) => {
    let textarea;
    let result;

    try {
        textarea = document.createElement('textarea');
        textarea.setAttribute('readonly', true);
        textarea.setAttribute('contenteditable', true);
        textarea.style.position = 'fixed'; // prevent scroll from jumping to the bottom when focus is set.
        textarea.value = string;

        document.body.appendChild(textarea);

        textarea.focus();
        textarea.select();

        const range = document.createRange();
        range.selectNodeContents(textarea);

        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);

        textarea.setSelectionRange(0, textarea.value.length);
        result = document.execCommand('copy');
    } catch (err) {
        console.error(err);
        result = null;
    } finally {
        document.body.removeChild(textarea);
    }
}

/**
 * Maps all comments and changes given prop. Returns fully reconstructed comment tree which then can be passed into redux
 * @param dataToMap array of comments to map
 * @param nameToFind fullname of a thing to find
 * @param likesProp value to which "likes" prop needs to be changed 
 * @param commentToAdd new comment object that needs to be appended to a thing  
 * @returns array of reconstructed comments with changed values
 */

export const mapReplies = ({ dataToMap, nameToFind, likesProp, commentToAdd = null }) => {

    if (!dataToMap) return;
    return dataToMap.reduce((tree, item) => {
        // if item is null return composed tree
        if (!item) return [...tree];

        // if we encounter kind = more, just return tree and this "more" item as it is 
        if (item.kind === 'more') return [...tree, { ...item }]

        if (item.data.name === nameToFind) {

            // if item does already have replies, just add the comment to the arr and copy all the prev data 
            if (item.data.replies) {

                return [...tree, {
                    ...item,
                    data: {
                        ...item.data,
                        likes: likesProp,
                        replies: {
                            ...item.data.replies,
                            data: {
                                ...item.data.replies.data,
                                children: [...item.data.replies.data.children, commentToAdd]

                            }
                        }
                    }

                }]

                // otherwise, just create replies object and add the necessary data 

            } else {
                return [...tree, {
                    ...item,
                    data: {
                        ...item.data,
                        likes: likesProp,
                        replies: {

                            data: {

                                children: [commentToAdd]

                            }
                        }
                    }

                }]
            }

        };

        // if item doesn't have replies just return constructed tree and the item itself
        if (!item.data.replies) return [...tree, item];

        return [...tree, {
            ...item,
            data: {
                ...item.data,
                replies: {
                    ...item.data.replies,
                    data: {
                        ...item.data.replies.data,
                        children: mapReplies({ dataToMap: item.data.replies.data.children, nameToFind, likesProp, commentToAdd })
                    }
                }
            }
        }]
    }, [])

}
