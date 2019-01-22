const {videoDisplay} = require('../Logic/Logic')

let videoWithChannelName = {auth_id: "google-oauth2|104936229711594797113",
category: "music",
channel_name: "kylewill",
duration: "3:37",
email: "kjwillcocks92@gmail.com",
first_name: "Kyle",
last_name: "Willcocks",
thumbnail: "thumbnails.jpg",
title: "Dont stop me now - Queen",
user_id: 3,
user_img: "https://lh3.googleusercontent.com/-b2xwjbFHQCo/AAAAAAAAAAI/AAAAAAAAAAA/AGDgw-gNF_D4TKbjTG4wB4lhnuEzw_qU7Q/mo/photo.jpg",
video_desc: "no description needed with Queen",
video_id: 41,
video_url: "https://youtube-clone-dm.s3.amazonaws.com/c991813c-c130-4034-8fcc-8a2c5d9b403e-Queen---Don't-Stop-Me-Now-(Official-Video).mp4",
view_count: 1040}

let videoWithoutChannelName = {auth_id: "google-oauth2|104936229711594797113",
category: "music",
duration: "3:37",
email: "kjwillcocks92@gmail.com",
first_name: "Kyle",
last_name: "Willcocks",
thumbnail: "thumbnails.jpg",
title: "Dont stop me now - Queen",
user_id: 3,
user_img: "https://lh3.googleusercontent.com/-b2xwjbFHQCo/AAAAAAAAAAI/AAAAAAAAAAA/AGDgw-gNF_D4TKbjTG4wB4lhnuEzw_qU7Q/mo/photo.jpg",
video_desc: "no description needed with Queen",
video_id: 41,
video_url: "https://youtube-clone-dm.s3.amazonaws.com/c991813c-c130-4034-8fcc-8a2c5d9b403e-Queen---Don't-Stop-Me-Now-(Official-Video).mp4",
view_count: 1040}

let videoWithUnkownUploader = {auth_id: "google-oauth2|104936229711594797113",
category: "music",
duration: "3:37",
thumbnail: "thumbnails.jpg",
title: "Dont stop me now - Queen",
video_desc: "no description needed with Queen",
video_id: 41,
video_url: "https://youtube-clone-dm.s3.amazonaws.com/c991813c-c130-4034-8fcc-8a2c5d9b403e-Queen---Don't-Stop-Me-Now-(Official-Video).mp4",
view_count: 1040}

describe("Tests what info displays for videos on home page",()=>{
    test("User should be a string",()=>{
        expect(typeof(videoDisplay(videoWithChannelName))).toBe('string')
    })
    test('If video has a channel name function return channel name',()=>{
        expect(videoDisplay(videoWithChannelName)).toBe('kylewill')
    })
    test('If video does not have a channel name it should return first and last name of uploader',()=>{
        expect(videoDisplay(videoWithoutChannelName)).toBe('Kyle Willcocks')
    })
    test('If video does not exist function should return and empty string',()=>{
        expect(videoDisplay()).toBe('')
    })
    test('If video channel name and first and last name does not exist should return unkown',()=>{
        expect(videoDisplay(videoWithUnkownUploader)).toBe('Unkown')
    })
})