import React, { Component } from 'react';
import axios from 'axios';
import './Video.css';
import pic from './icons8-facebook-dislike-24.svg';
import pic2 from './icons8-facebook-like-24.png';

class Video extends Component {
    constructor() {
        super()
        this.state = {
            videos: [],
            showVid: {}
        }
    }

    componentDidMount() {
        axios.get(`/api/video/${this.props.match.params.id}`).then(res => {
            this.setState({
                showVid: res.data[0]
            })
            let category = res.data[0].category
            axios.get(`/api/video-categories/${category}`).then(res => {
                this.setState({
                    videos: res.data
                })
            })
        })
    }



    render() {
        let categoryList = this.state.videos.map((list, i) => {
            return (
                <div className='suggested-list' key={i}>
                    <video src={list.video_url}></video>
                    <div className='category-desc'>
                        <h4>{list.title}</h4>
                        <p>Author</p>
                        <p>{list.view_count}</p>
                    </div>
                </div>
            )
        })

        return (
            <div className="Video">
                <div className="player">
                    <video className="vid" controls src={this.state.showVid.video_url}></video>
                    <h4 id="titulo">{this.state.showVid.title}</h4>
                    <div className="views-n-likes">
                        <span><p>{this.state.showVid.view_count} views</p></span>
                        <div className="likes">
                            <div className="likebox">
                                <button id="like-button"><img src={pic2} alt="" /></button>
                                <p>15</p>
                            </div>
                            <div className="dislikebox">
                                <button id="dislike-button"><img src={pic} alt="" /></button>
                                <p>4</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='category-list'>
                    {categoryList}
                </div>
            </div>
        )
    }
}

export default Video;