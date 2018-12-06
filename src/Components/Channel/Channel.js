import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './Channel.css';

class Channel extends Component {
    constructor(){
        super();

        this.state = {
            userInfo: {},
            user_id: 0,
            videos: []
        }
    }

    componentDidMount(){
        this.getUser()
    }

    getUser = () => {
        axios.get('/api/userinfo')
        .then( (res) => {
            console.log(25, res)
          this.setState({userInfo: res.data, user_id: res.data.user_id})
          this.getVideos()
        })
    }

    getVideos = () => {
        let {user_id} = this.state
        axios.get(`/api/by-user/${user_id}`)
            .then( (res) => {
                console.log(33, res)
                this.setState({videos: res.data})
            })
    }

    render(){
        let {first_name, last_name, channel_name, user_img} = this.state.userInfo
        let {videos} = this.state
        if(!channel_name){
            channel_name = 'Add a Channel Name'
        };
        let videosDisplay = videos.map( (video, i) => {
            return (
                <div className="videoz" key={i}>
                    <Link to={`/video/${video.video_id}`}><video id="thumbnail" src={video.video_url}></video></Link>
                    <h4>{video.title}</h4>
                    <p id="vid-author">Uploaded by You</p>
                    <p id="view-count">{video.view_count} views</p>
                </div>
            )
        })
        if(!videos[0]){
            videosDisplay = "This channel doesn't have any content"
        } 

        return(
            <div className="channel">
                <div className="channel-banner-wrapper">
                    <div className="channel-banner">
                        <div className="left-channel-banner">
                            <img src={user_img} alt="profile-pic" className="profile-image"/>
                            <div className="name-wrapper">
                                <h3 className="user-name">{first_name} {last_name}</h3>
                                <h1 className="channel-name">{channel_name}</h1>
                            </div>
                        </div>
                        <div className="add-channel-name"><span>+ CHANNEL NAME</span></div>
                    </div>
                </div>
                <div className="Home">
                    <div className="home-container">
                        <div className="uploads-view">
                            <h3>Uploads</h3>
                        </div>
                        <div className="video-container">
                            {videosDisplay}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Channel; 