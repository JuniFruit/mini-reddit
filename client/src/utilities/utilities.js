
/* Determines how many news containers will be shown in Top news section */

export const numberOfNewsToShow = () => {

    const width = window.innerWidth;

    if (width > 900) return 4;
    if (width < 900 && width > 730) return 3;
    if (width < 730 && width > 500) return 2;
    if (width < 500) return 1;

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

    if (Math.floor(num) > 1000) {
        return `${(num / 1000).toFixed(1)}K`;
    }
    return num;
}

export const truncTitle = (title) => {
    
    if (title.length > 50) {
        const trimmed = title.slice(0, 47).concat('...');
        return trimmed
    }
    return title
}

/* Redirects user to reddit to login user */

export const redirectToRedditLogin = () => {

    const scope = 'history identity mysubreddits vote submit wikiread read report subscribe flair'
    window.location.href = `https://www.reddit.com/api/v1/authorize?client_id=N_FuvhLdY7m1D5QjJ6YRXA&response_type=code&state=test&redirect_uri=http://localhost:3000/reddit_login&duration=temporary&scope=${scope}`

}
