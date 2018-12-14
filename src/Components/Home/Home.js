import React, { Component } from 'react';
import axios from 'axios';
import './Home.css';
import {Link} from 'react-router-dom';

class Home extends Component {
    constructor(){
        super()
        this.state = {
            videos: [],
            musicVids: [],
            sportsVids: []
        }
    }

    componentDidMount(){
        axios.get('/api/by-view').then(res => {
            this.setState({
                videos: res.data
            })
        })
        this.getMusic()
        this.getSports()
        
    }

    getMusic = () => {
        let category = "music"
        axios.get(`/api/video-categories/${category}/0`).then(res => {
            this.setState({
                musicVids: res.data
            })
        })
    }
    getSports = () => {
        let category = "sports"
        axios.get(`/api/video-categories/${category}/0`).then(res => {
            this.setState({
                sportsVids: res.data
            })
        })
    }
    
    render(){
        
        let videosDisplay = this.state.videos.map((video, i) => {
            let user = ''
            if(video.channel_name){
                user = video.channel_name
            } else {
                user = `${video.first_name} ${video.last_name}`
            }
            return (
                <div className="videoz" key={i}>
                    <Link to={`/video/${video.video_id}`}><video id="thumbnail" src={video.video_url}></video>
                    <h4>{video.title}</h4>
                    </Link>
                    <p id="vid-author">{user}</p>
                    <p id="view-count">{video.view_count} views</p>                
                </div>
            )
        })

        let musicDisplay = this.state.musicVids.map((music, i) => {
            let user = ''
            if(music.channel_name){
                user = music.channel_name
            } else {
                user = `${music.first_name} ${music.last_name}`
            }
            return (
                <div className="videoz" key={i}> 
                    <Link to={`/video/${music.video_id}`}><video id="thumbnail" src={music.video_url}></video></Link>
                    <h4>{music.title}</h4>
                    <p id="vid-author">{user}</p>
                    <p id="view-count">{music.view_count} views</p>
                </div>
            )
        })

        let sportsDisplay = this.state.sportsVids.map((sport, i) => {
            let user = ''
            if(sport.channel_name){
                user = sport.channel_name
            } else {
                user = `${sport.first_name} ${sport.last_name}`
            }
            return (
                <div className="videoz" key={i}> 
                    <Link to={`/video/${sport.video_id}`}><video id="thumbnail" src={sport.video_url}></video></Link>
                    <h4>{sport.title}</h4>
                    <p id="vid-author">{user}</p>
                    <p id="view-count">{sport.view_count} views</p>
                </div>
            )
        })

        return(
            <div className="Home">
                <div className="home-container">
                    <div className="recommended">
                        <h3>Recommended</h3>
                    </div>
                    <div className="video-container">
                        {videosDisplay}
                    </div>
                    <div className="recommended">
                        <h3>Music</h3>
                    </div>
                    <div className="video-container">
                        {musicDisplay}
                    </div>
                    <div className="recommended">
                        <h3>Sports</h3>
                    </div>
                    <div className="video-container">
                        {sportsDisplay}
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;
// fixing stuff