import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './Channel.css';
import Swal from 'sweetalert2';
import {disable} from '../Logic/Logic'

class Channel extends Component {
    constructor(){
        super();

        this.state = {
            userInfo: {},
            videos: [],
            channelName: '',
            videosLoading: true,
            showSave: false,
            disable: true
        }
        this.handleInput = this.handleInput.bind(this)
    }

    componentDidMount(){
        this.getUser()
    }

    getUser = () => {
        axios.get('/api/userinfo')
        .then( (res) => {
            this.setState({userInfo: res.data})
            if(!res.data.user_id){
                Swal ({
                    type: 'warning',
                    title: 'Oops',
                    text: 'Sign in to access this feature',
                    onClose: () => {
                        this.props.history.push('/')
                    }
                })
            } else if(res.data.channel_name){
                this.setState({channelName: res.data.channel_name})
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
        this.setState({[event.target.name]: event.target.value})
    }

    handleEditClick = () => {
        this.setState({
            disable: disable(this.state.disable),
            showSave: disable(this.state.showSave)
        })
    }
    
    handleSaveClick = () => {

        let {channelName} = this.state;
        let {user_id} = this.state.userInfo
        console.log(user_id, channelName)
        axios.put('/api/channel-name', {user_id, channelName}).then(res => {
            this.setState({
                disable: disable(this.state.disable),
                showSave: disable(this.state.showSave)
            })
        });
    }

    deleteVideo( video ){
        let {video_id} = video
        axios.delete(`/api/delete/${video_id}`)
            .then( () => {
                this.getVideos()
            })
    }

    render(){
        let {videos, videosLoading, userInfo} = this.state
        let {first_name, last_name, user_img} = userInfo

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

        let videosDisplay = videos.map( (video, i) => {
            return (
                <div className="videoz" key={i}>
                    <Link to={`/video/${video.video_id}`}><video id="thumbnail" src={video.video_url}></video></Link>
                        <h4>{video.title}</h4>
                        <div className="upload-page-video-info">
                            <p id="vid-author">Uploaded by You</p>
                            <p id="view-count">{video.view_count} views</p>
                            <p id="vid-duration">{video.duration}</p>
                        </div>
                        <button className="delete-btn" onClick={ () => this.deleteVideo(video)} >Delete</button>
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
                                <input className="channel-name" type="text" onChange={this.handleInput} value={this.state.channelName} name="channelName" disabled={this.state.disable}/>
                            </div>
                        </div>
                        {this.state.showSave
                        ? <div onClick={this.handleSaveClick} className="add-channel-name"><span>SAVE CHANNEL NAME</span></div>
                        : <div onClick={this.handleEditClick} className="add-channel-name"><span>EDIT CHANNEL NAME</span></div>
                        }
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