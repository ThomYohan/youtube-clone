import React, { Component } from 'react';
import axios from 'axios';
import './Home.css';

class Home extends Component {
    constructor(){
        super()
        this.state = {
            videos: []
        }
    }

    componentDidMount(){
        axios.get('/api/by-view').then(res => {
            this.setState({
                videos: res.data
            })
        })
    }

    render(){
        let videosDisplay = this.state.videos.map((video, i) => {
            return (
                <div className="videoz">
                    <video src={video.video_url}></video>
                    <h4>{video.title}</h4>
                    <p id="vid-author">Author</p>
                    <p id="view-count">{video.view_count} views</p>
                </div>
            )
        })

        return(
            <div className="Home">
                <div className="recommended">
                    <h3>Recommended</h3>
                </div>
                <div className="video-container">
                    {videosDisplay}
                </div>
            </div>
        )
    }
}

export default Home;