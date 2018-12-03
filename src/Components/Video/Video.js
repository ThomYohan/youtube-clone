import React, { Component } from 'react';
import axios from 'axios';
import './Video.css';
import pic from './icons8-facebook-dislike-24.svg';
import pic2 from './icons8-facebook-like-24.png';

class Video extends Component {
    constructor(){
        super()
        this.state = {
            videos: [],
            showVid: {}
        }
    }

    componentDidMount(){
        axios.get(`/api/video/${this.props.match.params.id}`).then(res => {
            console.log(222, res.data)
            this.setState({
                showVid: res.data[0]
            })
        })
    }

    render(){
        return(
            <div className="Video">
                <div className="player">
                    <video  className="vid" controls src={this.state.showVid.video_url}></video>
                    <h4 id="titulo">{this.state.showVid.title}</h4>
                    <div className="views-n-likes">
                        <span><p>{this.state.showVid.view_count} views</p></span>
                        <div className="likes">
                            <div className="likebox">
                                <button id="like-button"><img src={pic2} alt=""/></button>
                                <p>15</p>
                            </div>
                            <div className="dislikebox">
                                <button id="dislike-button"><img src={pic} alt=""/></button>
                                <p>4</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Video;