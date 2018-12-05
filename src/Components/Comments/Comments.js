import React, { Component } from 'react';
import './Comments.css';
import axios from 'axios'


class Comments extends Component {
    constructor() {
        super()
        this.state = {
            userInfo: {},
            comments: [],
            commentInput: ''
        }
    }
    componentDidMount() {
        axios.get(`/api/comments/${this.props.video_id}`).then(res => {
            this.setState({
                comments: res.data
            })
        })
        axios.get(`/api/userinfo`).then(res => {
            this.setState({
                userInfo: res.data
            })
        })
    }
    handleCommentInput(e) {
            this.setState({
                commentInput: e.target.value
            })
    }
    postComment(){
        
    }
    render() {
        let commentsDisplay = this.state.comments.map((comment, i) => {
            return (<div key={i}>
                <div>
                    <div><img src={comment.user_img } alt="user"></img></div>
                </div>
                <div>
                    <div>{comment.first_name} {comment.last_name}</div>
                    <div>{comment.comment}</div>
                </div>
            </div>)
        })
        let comment = <div/>
         if (Object.keys(this.state.userInfo).length !== 0) {
            comment = <div>
                <img src={this.state.userInfo.picture}></img>
                <input placeholder='Add a public comment...'></input>
                <button onClick={(e) => this.handleCommentInput(e)}>Add Comment</button>
            </div>
        } 
        else {
            comment = <div>
                <p>Please Login to post a comment.</p>
            </div>
        }
        return (
            <div className='comments'>
                <div>
                    <h1>Comments: {this.state.comments.length}</h1>
                </div>
                <div>
                    <img src={this.state.userInfo.picture} alt='user'></img>
                    <input placeholder='Add a public comment...'></input>
                </div>
                    {comment}
                <div>
                    {commentsDisplay}
                </div>
            </div>
        )
    }
}

export default Comments;