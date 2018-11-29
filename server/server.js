require("dotenv").config();
const express = require('express');
const session = require('express-session');
const axios = require('axios');
const massive = require('massive');
const bodyParser = require('body-parser');
const aws = require('aws-sdk');
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
    AUTH_PROTOCAL,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_REGION,
    S3_BUCKET
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
    let userName = name.split(' ')
        let firstName = userName[0]
        let lastName = userName[1]
    // check if that user already exists in our db
    const db = app.get('db');
    let foundCustomer = await db.find_customer([sub]);
    if (foundCustomer[0]) {
        // found user existing in the db, put user on session
        req.session.user = foundCustomer[0];
    } else {
        // no user found by google id. create user in db
        let createdCust = await db.create_user([firstName, lastName, sub, picture, email])
        req.session.user = createdCust[0]
    }
    res.redirect('/#/')
});

app.get('/api/signs3', (req, res) => {
    aws.config = {
        region: AWS_REGION,
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY
    };

    const s3 = new aws.S3();
    const fileName = req.query['file-name'];
    const fileType = req.query['file-type'];
    const s3Params = {
        Bucket: S3_BUCKET,
        Key: fileName,
        Expires: 60,
        ContentType: fileType,
        ACL: 'public-read',
    };

    s3.getSignedUrl('putObject', s3Params, (err, data) => {
        if (err) {
            console.log(err);
            return res.end();
        }
        const returnData = {
            signedRequest: data,
            url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
        };

        return res.send(returnData);
    });
});

app.get('/api/video/:id',controller.getOne)
app.post('/api/upload',controller.upload)




app.listen(SERVER_PORT, () => console.log(`Listening on port: ${SERVER_PORT}`)) 