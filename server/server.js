const express = require("express");
require('dotenv').config();
const PORT = process.env.PORT || 3001;
const app = express();
const fetch = require('node-fetch')
const cors = require('cors');


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
        console.log(access_obj)
        const userResponse = await fetch('https://oauth.reddit.com/api/v1/me', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${access_obj.access_token}`
            }
        })
        const user = await userResponse.json();

        res.send({
            token: access_obj.access_token,
            data: {
                [user.name]: {
                    user: user.name,
                    userId: user.id,
                    userIcon: user.icon_img
                }

            }

        })
        access_token = access_obj.access_token;


    } catch (e) {
        res.send({ status: 'error', message: 'Authorization failed. Reason ' + e })
    }
})


// Data requests

app.get("/popular", async (req, res) => {

    try {

        const response = await fetch('https://www.reddit.com/r/popular.json');
        const data = await response.json();
        console.log(data);
        res.send({status: 200, data: data})

    } catch (e) {
        res.send({status: 'error', message: `Couldn't retrieve the data. Reason: ${e}`});
    }
})



app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});