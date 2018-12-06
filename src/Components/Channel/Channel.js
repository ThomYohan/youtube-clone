import React, { Component } from 'react';
import axios from 'axios';
import './Channel.css';

class Channel extends Component {
    constructor(){
        super();

        this.state = {
            userInfo: {},
            user_id: 0
        }
    }

    componentDidMount(){
        axios.get('/api/userinfo')
        .then( (res) => {
          this.setState({userInfo: res.data, user_id: res.data.user_id})
        })
    }

    // getVideos(){
    //     axios.get('/api/by-users', {user_id})
    //         .then( (res) => {

    //         })
    // }

    render(){
        let {first_name, last_name, channel_name, user_img} = this.state.userInfo
        if(!channel_name){
            channel_name = 'Add a Channel Name'
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
                        <button className="add-channel-name">Add Channel Name</button>
                    </div>
                </div>
                <div className="channel-videos">
                </div>
            </div>
        )
    }
}

export default Channel; 