
const client_id = 'N_FuvhLdY7m1D5QjJ6YRXA';
const state = 'test';
const response_type = 'code';
const redirect_uri = 'http://localhost:3000/';
const duration = 'permanent';
const scope = 'identity';
const secret = '0bOe1v0Zm_mD5aZ6EDH2NJXml8uEFA';

let access_obj;

export const getAuthorized = () => {
    if (access_obj) {
        return access_obj.access_token;
    }

    const regExp = /(http:\/\/localhost:3000\/)/;
    const query = window.location.href.replace(regExp, '');
    const params = new URLSearchParams(query);
   

    if (params.has('state') && params.has('code')) {
        getAccessToken(params.get('code'));

        console.log(access_obj)
    }
    if (!access_obj && !params.has('code')) {
        window.location.href = `https://www.reddit.com/api/v1/authorize?client_id=${client_id}&response_type=${response_type}&state=${state}&redirect_uri=${redirect_uri}&duration=${duration}&scope=${scope}`

    }


}

const getAccessToken = async (uniqueCode) => {
    console.log(uniqueCode)
    
   
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        "Authorization": "Basic " + btoa(`${client_id}:${secret}`)
   }

    const response = await fetch('https://www.reddit.com/api/v1/access_token', {
        method: 'POST',

        body: JSON.stringify({
            "grant_type": 'authorization_code',
            "code": uniqueCode,
            "redirect_uri": redirect_uri
        }),
        headers
    })


    const json = await response.json();
    console.log(json)
    access_obj = json;
}

