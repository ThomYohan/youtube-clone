require("dotenv").config();
const express = require('express');
const session = require('express-session');
const axios = require('axios');
const massive = require('massive');
const bodyParser = require('body-parser');
const controller = require('./controller');

const app = express();

app.use(express.static(`${__dirname}/../build`));

const {
    SERVER_PORT,
    REACT_APP_DOMAIN,
    REACT_APP_CLIENT_ID,
    CLIENT_SECRET,
    CONNECTION_STRING,
    SECRET,
    AUTH_PROTOCAL
} = process.env;

massive(CONNECTION_STRING).then(db => app.set('db', db))

app.use(bodyParser.json());

app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false
}))

app.get('/auth/callback', async (req, res) => {

    let payload = {
        client_id: REACT_APP_CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: req.query.code,
        grant_type: 'authorization_code',
        redirect_uri: `${AUTH_PROTOCAL}://${req.headers.host}/auth/callback`
    }


    // auth0 sending code in req.query.code
    let tokenRes = await axios.post(`https://${REACT_APP_DOMAIN}/oauth/token`, payload)
    // exchange code for token. token is on resWithToken.data.access_token
    // exchange token for user data
    let userRes = await axios.get(`https://${REACT_APP_DOMAIN}/userinfo?access_token=${tokenRes.data.access_token}`)

    let { email, picture, sub, name } = userRes.data;
    // check if that user already exists in our db
    const db = app.get('db');
    let foundCustomer = await db.find_customer([sub]);
    if (foundCustomer[0]) {
        // found user existing in the db, put user on session
        req.session.user = foundCustomer[0];
    } else {
        // no user found by google id. create user in db
        let createdCust = await db.create_customer([name, sub, picture, email])
        req.session.user = createdCust[0]
    }
    res.redirect('/#/')
})


app.listen(SERVER_PORT, () => console.log(`Listening on port: ${SERVER_PORT}`)) 