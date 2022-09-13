const express = require("express");
const errorMessage = require('./utility');
require('dotenv').config();
const PORT = process.env.PORT || 3001;
const app = express();
const fetch = require('node-fetch')
const cors = require('cors');
const connectToMongo = require("./mongoose");
const turndown = require('turndown');

const User = require('./User');


const REDIRECT_URI = 'http://localhost:3000/reddit_login';
const BASE_AUTH_URL = 'https://oauth.reddit.com';
const BASE_NO_AUTH_URL = 'https://www.reddit.com';

connectToMongo();



app.use(cors());
app.use(express.json());

app.get("/api/find_user", async (req, res) => {

    try {
        const id = req.query.id

        User.findOne({ userId: id }, (err, user) => {
            if (!err) {
                if (!user) return res.send('User not found')
                return res.send(user);
            } else {
                return res.send(err)
            }
        });


    } catch (e) {
        console.log(e);
        res.status(400).send(errorMessage(e));
    }
})

app.get("/api/logout", async (req, res) => {
    try {
        const id = req.query.id;
        User.findOneAndDelete({userId: id}, (err, result) => {
            if (!err) {
                
                res.send('User deleted')
            } else {
                res.send(err);
            }
        })
    } catch(e) {
        res.status(400).send(errorMessage(e));
    }
})

app.get("/api/reddit_login", async (req, res) => {


    try {

        const code = req.query.code;
        const encodedHeader = Buffer.from(`${process.env.CLIENT_ID}:${process.env.SECRET_KEY}`).toString('base64');

        const response = await fetch(`${BASE_NO_AUTH_URL}/api/v1/access_token`, {
            method: 'POST',
            body: `grant_type=authorization_code&code=${code}&redirect_uri=${REDIRECT_URI}`,
            headers: {
                Authorization: 'Basic ' + encodedHeader,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

        const access_obj = await response.json();


        const userResponse = await fetch(`${BASE_AUTH_URL}/api/v1/me?raw_json=1`, {

            headers: {
                Authorization: `Bearer ${access_obj.access_token}`
            }
        })
        const user = await userResponse.json();

        const userToStore = await User.create({
            userId: user.id,
            name: user.name,
            icon: user.icon_img,
            total_karma: user.total_karma,            
            token: access_obj.access_token


        });       
       
      
        res.send(
            {
                name: user.name,
                userId: user.id,
                icon: user.icon_img,
                total_karma: user.total_karma,
                token: access_obj.access_token
            }

        )



    } catch (e) {
        console.log(e)
        res.statusMessage = "Failed to login";
        res.status(400);
        res.json(e)
    }
})


app.post('/api/add_comment', async (req, res) => {

    const turndownService = new turndown();

    try {
        const token = req.query.token
        const text = turndownService.turndown(req.body.text.replaceAll(/<\/?strike>/ig, '~~')); //turndown doesn't support strikethrough
        const thing_id = req.body.parent_id;

        const response = await fetch(`${BASE_AUTH_URL}/api/comment`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },

            body: `text=${text.toString()}&thing_id=${thing_id}&return_rtjson=true`
        })
        const data = await response.json();

        res.send(data)
    } catch (e) {
        res.send(e)

    }
})

/* Data requests */

app.get('/api/get_side_listing', async (req, res) => {


    try {
        const token = req.query.token;
        const endpoint = token ? `${BASE_AUTH_URL}/subreddits/mine/subscriber` : `${BASE_NO_AUTH_URL}/subreddits.json`
        const response = await fetch(`${endpoint}?raw_json=1`, {
            headers: {
                Authorization: `Bearer ${token}`

            }
        });

        const data = await response.json();

        const slicedChildren = data.data.children.slice();

        res.send({
            data: slicedChildren
        })


    } catch (e) {
        res.status(400).send(errorMessage(e));
    }
})

app.get('/api/get_posts', async (req, res) => {


    try {
        const token = req.query.token;
        const subreddit = req.query.subreddit === 'undefined' ? '' : `r/${req.query.subreddit}`;
        const sort = req.query.sort;
        const after = req.query.after;
        const before = req.query.before;
        const endpoint = token ? BASE_AUTH_URL : BASE_NO_AUTH_URL;

        const response = await fetch(`${endpoint}/${subreddit}/${sort}.json?after=${after}&before=${before}&count=25&sr_detail=1&raw_json=1`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })


        const data = await response.json();

        const dataToSend = {
            after: data.data.after,
            before: data.data.before,
            dist: data.data.dist,
            children: data.data.children
        }

        res.send(dataToSend)

    } catch (e) {

        res.status(400).send(errorMessage(e));

    }
})

app.get('/api/get_comments', async (req, res) => {

    try {
        const token = req.query.token
        const subreddit = req.query.subreddit;
        const postId = req.query.postId;
        const title = req.query.title;
        const sort = req.query.sort
        const endpoint = token ? BASE_AUTH_URL : BASE_NO_AUTH_URL

        const response = await fetch(`${endpoint}/r/${subreddit}/comments/${postId}/${title}.json?sr_detail=1&sort=${sort}&raw_json=1`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        const data = await response.json();


        res.send(data);

    } catch (e) {
        res.status(400).send(errorMessage(e));
    }
})

app.get('/api/get_more_comments', async (req, res) => {

    try {
        const name = req.query.name;
        const link_id = req.query.link_id;
        const children = req.query.children;
        const sort = req.query.sort;
        const token = req.query.token;


        const response = await fetch(`${BASE_AUTH_URL}/api/morechildren?children=${children}&link_id=${link_id}&api_type=json&id=${name}&sort=${sort}&raw_json=1`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const data = await response.json();

        res.send(data);

    } catch (e) {
        res.status(400).send(errorMessage(e))

    }
})

app.get('/api/get_subreddit_data', async (req, res) => {

    try {

        const subreddit = req.query.subreddit;
        const token = req.query.token;
        const endpoint = token ? BASE_AUTH_URL : BASE_NO_AUTH_URL

        const response = await fetch(`${endpoint}/r/${subreddit}/about.json?raw_json=1`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data = await response.json();
        res.send({ data: data });

    } catch (e) {
        res.status(400).send(errorMessage(e));
    }
})

app.get('/api/subreddit_modlist', async (req, res) => {

    try {
        const subreddit = req.query.subreddit;
        const token = req.query.token;

        const response = await fetch(`${BASE_AUTH_URL}/r/${subreddit}/about/moderators.json?raw_json=1`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const data = await response.json();

        res.send(data);

    } catch (e) {
        res.status(400).send(errorMessage(e));
    }
})



app.get('/api/search', async (req, res) => {

    try {
        const query = req.query.q;

        const response = await fetch(`${BASE_NO_AUTH_URL}/search.json?q=${query}&limit=100&type=link,sr&sr_detail=1&raw_json=1`);

        const data = await response.json();

        res.send(data);
    } catch (e) {

        res.status(400).send(errorMessage(e))
    }
})


app.get('/api/user_about', async (req, res) => {

    try {
        const user = req.query.user

        const response = await fetch(`${BASE_NO_AUTH_URL}/user/${user}/about.json?raw_json=1`);
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


/* Returns top news  */

app.get('/api/news', async (req, res) => {

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



app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

