import React, { Component } from 'react';
import axios from 'axios';
import './Home.css';
import {Link} from 'react-router-dom';

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
                <div className="videoz" key={i}>
                    <Link to={`/video/${video.video_id}`}><video id="thumbnail" src={video.video_url}></video></Link>
                    <h4>{video.title}</h4>
                    <p id="vid-author">Author</p>
                    <p id="view-count">{video.view_count} views</p>
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
                </div>
            </div>
        )
    }
}

export default Home;
// fixing stuff