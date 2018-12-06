import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './Channel.css';

class Channel extends Component {
    constructor(){
        super();

        this.state = {
            userInfo: {},
            videos: [],
            channelName: 'Add a Channel Name',
            videosLoading: true
        }
        this.updateChannel = this.updateChannel.bind(this)
        this.handleInput = this.handleInput.bind(this)
    }

    componentDidMount(){
        this.getUser()
    }

    getUser = () => {
        axios.get('/api/userinfo')
        .then( (res) => {
            if(res.data.channel_name){
                this.setState({userInfo: res.data, channelName: res.data.channel_name})
            } else {
                this.setState({userInfo: res.data})
            }
          this.getVideos()
        })
    }

    getVideos = () => {
        let {user_id} = this.state.userInfo
        let {videosLoading} = this.state
        axios.get(`/api/by-user/${user_id}`)
            .then( (res) => {
                this.setState({videos: res.data, videosLoading: !videosLoading})
            })
    }

    handleInput(event){
        console.log(event.target.value)
        this.setState({[event.target.name]: event.target.value})
    }
    
    updateChannel(){
        let {channelName} = this.state
        let {user_id} = this.state.userInfo
        axios.put('/api/channel-name', {user_id, channelName})
            .then( () => {
                // this.setState({channelName: channel_name_input})
                console.log(channelName)
            })
            .catch( err => console.log(err))
    }

    render(){
        let {videos, videosLoading, userInfo, channelName} = this.state
        let {first_name, last_name, channel_name, user_img} = userInfo
        // let channel_name_field = <div></div>
        if(!userInfo){
            return (
                <div className="channel">
                    <div className="channel-banner-wrapper">
                        <div className="channel-banner">
                        Please sign in.
                        </div>
                    </div>
                </div>
            )
        }

        // if(!channel_name){
        //     channel_name_field = <input type="text" placeholder='Add a Channel Name' name="channel_name_input" onChange={this.handleInput} />
        // } else {
        //     channel_name_field = <h1 className="channel-name">{channel_name}</h1>
        // }
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
        if(!videos[0] && !videosLoading){
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
                                {/* {channel_name_field} */}
                                <input className="channel-name" name="channelName" placeholder={channelName} onChange={this.handleInput} />
                            </div>
                        </div>
                        <div onClick={this.updateChannel} className="add-channel-name"><span>SAVE CHANNEL NAME</span></div>
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