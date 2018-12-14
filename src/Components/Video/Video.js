import React, { Component } from 'react';
import axios from 'axios';
import './Video.css';
import pic from './icons8-facebook-dislike-24.svg';
import pic2 from './icons8-facebook-like-24.png';
import Comments from '../Comments/Comments';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';


class Video extends Component {
    constructor() {
        super()
        this.state = {
            videos: [],
            showVid: {},
            author: '',
            img: '',
            description: '',
            viewCount: 0,
            likeCount: 0,
            dislikeCount: 0,
            signedIn: false,
            userInfo: {},
            viewed: false,
            duration: 0,
            likedVideo: true,
            dislikedVideo: false
        }
        this.addView = this.addView.bind(this)
    }

    componentDidMount() {
        this.getVideo()
        this.getLikes()
        this.getDislikes()
        this.getUser()        
    }

    
    componentDidUpdate(prevProps){
        if(prevProps !== this.props){
            this.getVideo()
            this.getLikes()
            this.getDislikes()
        }
    }

    getUser = () => {
        axios.get('/api/userinfo').then(res => {
            if (res.data.user_id) {
                this.setState({
                    signedIn: true,
                    userInfo: res.data
                })
            }
        })
    }

    getVideo = () => {
        axios.get(`/api/video/${this.props.match.params.id}`).then(res => {
            this.setState({
                showVid: res.data[0],
                viewCount: res.data[0].view_count,
                author: res.data[0].channel_name,
                img: res.data[0].user_img,
                description: res.data[0].video_desc
            })
            let category = res.data[0].category
            axios.get(`/api/video-categories/${category}/${this.props.match.params.id}`).then(res => {
                this.setState({
                    videos: res.data
                })
            })
        })
    }

    getLikes = () => {
        axios.get(`/api/get-likes/${this.props.match.params.id}`).then(res => {
            this.setState({
                likeCount: res.data[0].count
            })
        })
    }

    getDislikes = () => {
        axios.get(`/api/get-dislikes/${this.props.match.params.id}`).then(res => {
            this.setState({
                dislikeCount: res.data[0].count
            })
        })
    }

    likeVideo = () => {
        let video_id = this.props.match.params.id
        let likeDislike = true
        let {signedIn} = this.state
        if(!signedIn){
            Swal ({
                type: 'warning',
                title: 'Oops',
                text: 'Sign in to access this feature'
            })
        } else {
            axios.post(`/api/like-dislike`, {video_id, likeDislike}).then(res => {
                console.log(1, res)
                this.getLikes()
                this.getDislikes()       
            })
        }
    }

    dislikeVideo = () => {
        let video_id = this.props.match.params.id
        let likeDislike = false
        let {signedIn} = this.state
        if(!signedIn){
            Swal ({
                type: 'warning',
                title: 'Oops',
                text: 'Sign in to access this feature'
            })
        } else {
            axios.post(`/api/like-dislike`, {video_id, likeDislike}).then(res => {
                console.log(2, res)
                this.getLikes()
                this.getDislikes()
            })
        }
    }

    addView(){
        let {video_id} = this.state.showVid
        let {viewed} = this.state
        if(!viewed){
            axios.put('/api/view-count', {video_id})
                .then( (res) => {
                    let {view_count} = res.data[0]
                    this.setState({viewCount: view_count, viewed: true})
                })
        }
    }

    render() {
        let categoryList = this.state.videos.map((list, i) => {
            let user = ''
            if(list.channel_name){
                user = list.channel_name
            } else {
                user = `${list.first_name} ${list.last_name}`
            }
            return (
                <div className='suggested-list' key={i}>
                    <Link to={`/video/${list.video_id}`}><video id="thumbnail" className="asdf123" src={list.video_url}></video></Link>
                    <div className='category-desc'>
                        <h4>{list.title}</h4>
                        <p id="sug-auth">{user}</p>
                        <p id="sug-v-count">{list.view_count} views</p>
                        <p id="vids-duration">{list.duration}</p>
                    </div>
                </div>
            )
        })

        return (
            <div className="Video">
                <div className="player">
                    <video className="vid" autoplay="true" controls src={this.state.showVid.video_url} onPlay={this.addView} ></video>
                    <h4 id="titulo">{this.state.showVid.title}</h4>
                    <div className="views-n-likes">
                        <span><p id="xxxx">{this.state.viewCount} views</p></span>
                        <div className="likes">
                            <div className="likebox">
                                <button onClick={this.likeVideo} id="like-button"> <img src={pic2} alt="" /></button>
                                <p>{this.state.likeCount}</p>
                            </div>
                            <div className="dislikebox">
                                <button onClick={this.dislikeVideo} id="dislike-button"><img src={pic} alt="" /></button>
                                <p>{this.state.dislikeCount}</p>
                            </div>
                        </div>
                    </div>
                    <div id="line-thing"></div>
                    <div className="author-n-descrip">
                        <div className="upperTier">
                            <div className="user-piccc">
                                <img id="com-pic" src={this.state.img} alt=""/>
                            </div>
                            <div className="author-area">
                                <h3 id="author-text">{this.state.author}</h3>
                            </div>
                        </div>
                        <div className="vid-description">
                            {this.state.description}
                        </div>
                    </div>
                    <br/>
                    <div id="line-thing"></div>
                    <Comments video_id={this.props.match.params.id} match={this.props.location.pathname}/>
                </div>
                <div className='category-list'>
                    {categoryList}
                </div>
                
            </div>
        )
    }
}

export default Video;