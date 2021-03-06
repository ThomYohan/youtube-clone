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
    AUTH_PROTOCOL,
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
        redirect_uri: `${AUTH_PROTOCOL}://${req.headers.host}/auth/callback`
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
    let foundCustomer = await db.find_user([sub]);
    if (foundCustomer[0]) {
        // found user existing in the db, put user on session
        req.session.user = foundCustomer[0];
    } else {
        // no user found by google id. create user in db
        let createdCust = await db.create_user([firstName, lastName, sub, picture, email])
        req.session.user = createdCust[0]
    }
    res.redirect(`/#/redirect`)
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



// organize endpoints by request type
app.get('/api/by-user/:id', controller.getVideosByUser)
app.get('/api/video-categories/:category/:id', controller.getVidoesByCategory)
app.get('/api/by-view', controller.getVidoesByViews)
app.get('/api/video/:id', controller.getOne)
app.get('/api/comments/:video_id', controller.getComments)
app.get('/api/get-likes/:id', controller.getLikes)
app.get('/api/get-dislikes/:id', controller.getDislikes)
app.get('/api/userinfo', controller.getUser)
app.get('/api/search', controller.searchVideos)
app.get('/api/userinfo', controller.getUser)

app.post('/api/search', controller.searchVideos)
app.post('/api/createcomment', controller.createComment)
app.post('/api/like-dislike', controller.like_dislike)
app.post('/api/upload', controller.upload)
app.post('/api/auth/signout', controller.signout)

app.put('/api/channel-name', controller.updateChannel)
app.put('/api/view-count', controller.viewCount)

app.delete('/api/deletecomment/:comment_id/:user_id/:video_id', controller.deleteComment)
app.delete('/api/delete/:video_id', controller.deleteVideo)

app.listen(SERVER_PORT, () => console.log(`Listening on port: ${SERVER_PORT}`)) 
