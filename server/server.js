const express = require("express");
const errorMessage = require('./utility');
require('dotenv').config();
const PORT = process.env.PORT || 3001;
const app = express();
const fetch = require('node-fetch')
const cors = require('cors');
const { response, application } = require("express");


const redirect_uri = 'http://localhost:3000/reddit_login';

let access_token;

app.use(cors());

app.get("/reddit_login", async (req, res) => {

    // if (access_token) res.send({token: access_token});
    try {

        const code = req.query.code;
        const encodedHeader = Buffer.from(`${process.env.CLIENT_ID}:${process.env.SECRET_KEY}`).toString('base64');

        const response = await fetch('https://www.reddit.com/api/v1/access_token', {
            method: 'POST',
            body: `grant_type=authorization_code&code=${code}&redirect_uri=${redirect_uri}`,
            headers: {
                Authorization: 'Basic ' + encodedHeader,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

        const access_obj = await response.json();

        const userResponse = await fetch('https://oauth.reddit.com/api/v1/me?raw_json=1', {

            headers: {
                Authorization: `Bearer ${access_obj.access_token}`
            }
        })
        const user = await userResponse.json();

        res.send({

            data: {
                user: {
                    name: user.name,
                    id: user.id,
                    icon: user.icon_img,
                    pref_geo: user.pref_geopopular,
                    total_karma: user.total_karma,

                }

            }

        })
        access_token = access_obj.access_token;


    } catch (e) {
        res.status(400).send(errorMessage(e));
    }
})

/* Data outh requests */

app.get('/search', async (req, res) => {

    try {
        const query = req.query.q;
        const after = req.query.after;
        const response = await fetch(`https://www.reddit.com/search.json?q=${query}&source=recent&type=link,sr&after=${after}&sr_detail=1&raw_json=1`);

        const data = await response.json();

        res.send(data);
    } catch (e) {

        res.status(400).send(errorMessage(e))
    }
})

app.get('/user_subreddits', async (req, res) => {

    const headers = {
        Authorization: `Bearer ${access_token}`
    };

    try {
        const response = await fetch('https://oauth.reddit.com/subreddits/mine/subscriber?raw_json=1', {
            headers: headers
        })

        const data = await response.json();

        const slicedChildren = data.data.children.slice();

        res.send({
            status: 200,
            data: slicedChildren
        })


    } catch (e) {
        res.status(400).send(errorMessage(e));
    }
})

app.get('/posts_auth', async (req, res) => {


    try {
        const subreddit = req.query.subreddit === 'undefined' ? '' : `r/${req.query.subreddit}`;
        const sort = req.query.sort;
        const after = req.query.after;
        const count = req.query.count;

        const response = await fetch(`https://oauth.reddit.com/${subreddit}/${sort}?after=${after}&count=${count}&sr_detail=1&raw_json=1`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })

        const data = await response.json();

        const dataToSend = {
            after: data.data.after,
            dist: data.data.dist,
            children: data.data.children
        }

        res.send(dataToSend)

    } catch (e) {
        res.status(400).send(errorMessage(e));

    }
})


// Data requests 

app.get('/user_about', async (req, res) => {

    try {
        const user = req.query.user

        const response = await fetch(`https://reddit.com/user/${user}/about.json?raw_json=1`);
        const data = await response.json();

        const dataToSend = {
            [user]: {
                ...data.data
            }
        }


        res.send(dataToSend)
    } catch (e) {
        res.status(400).send(errorMessage(e))
    }
})

/* Grabs comments and replies of a post */

app.get('/post_comments', async (req, res) => {

    try {
        const subreddit = req.query.subreddit;
        const postId = req.query.postId;
        const title = req.query.title;
        const sort = req.query.sort

        const response = await fetch(`https://www.reddit.com/r/${subreddit}/comments/${postId}/${title}.json?sr_detail=1&sort=${sort}&raw_json=1`);
        const data = await response.json();


        res.send(data);

    } catch (e) {
        res.status(400).send(errorMessage(e));
    }
})

/* Grabs more comments of a post */

app.get('/post_comments_more', async (req, res) => {

    try {
        const name = req.query.name;
        const link_id = req.query.link_id;
        const children = req.query.children;
        const sort = req.query.sort


        const response = await fetch(`https://oauth.reddit.com/api/morechildren?children=${children}&link_id=${link_id}&api_type=json&id=${name}&sort=${sort}&raw_json=1`, {
            headers: { Authorization: `Bearer ${access_token}` }
        })

        const data = await response.json();



        res.send(data);

    } catch (e) {
        res.status(400).send(errorMessage(e))
        console.log(e)
    }
})


/* Returns top news  */

app.get('/news', async (req, res) => {

    // Fetches user geo 

    try {
        const geoResponse = await fetch('http://ip-api.com/json/');
        const userGeo = await geoResponse.json();

    // Fetches top headlines in specified country from NewsApi

        const country = req.query.country !== '' ? req.query.country : userGeo.countryCode;
    
        const headlinesResponse = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${process.env.NEWS_API_KEY}`)
        const headlines = await headlinesResponse.json();
      
        const dataToSend = {
            newsData: [...headlines.articles],
            userGeo
        }
      
        res.send(dataToSend);

    } catch (e) {
        res.status(400).send(errorMessage(e));
    }
})

/* Returns all the info about the subreddit passed into the parameter */

app.get('/subreddit_data', async (req, res) => {

    try {

        const query = req.query.subreddit;
        const response = await fetch(`https://www.reddit.com/r/${query}/about.json?raw_json=1`);
        const data = await response.json();
        res.send({ data: data });

    } catch (e) {
        res.status(400).send(errorMessage(e));
    }
})

/* Returns posts from www.reddit.com no token required */

app.get('/posts_no_auth', async (req, res) => {

    try {
        const subreddit = req.query.subreddit === 'undefined' ? '' : `r/${req.query.subreddit}`;
        const sort = req.query.sort;
        const after = req.query.after;
        const count = req.query.count

        const response = await fetch(`https://www.reddit.com/${subreddit}/${sort}.json?after=${after}&count=${count}&sr_detail=1&raw_json=1`);
        const data = await response.json();

        const dataToSend = {
            after: data.data.after,
            dist: data.data.dist,
            children: data.data.children
        }

        res.send(dataToSend)


    } catch (e) {

        res.status(400).send(errorMessage(e));
    }

})

/* Returns top subreddits */

app.get('/top_subreddits', async (req, res) => {

    try {

        const response = await fetch('https://www.reddit.com/subreddits.json?raw_json=1');
        const data = await response.json();
        const slicedChildren = data.data.children.slice();
        res.send({ data: slicedChildren })

    } catch (e) {

        res.status(400).send(errorMessage(e));


    }
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

