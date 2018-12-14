import React, { Component } from 'react';
import './Comments.css';
import axios from 'axios'


class Comments extends Component {
    constructor() {
        super()
        this.state = {
            userInfo: {},
            comments: [],
            commentInput: '',
            commentPlaceHolder: 'Add a public comment...'
        }
        this.createComment = this.createComment.bind(this)
        this.signIn = this.signIn.bind(this)
    }
    componentDidMount() {
        this.getComments()
        axios.get(`/api/userinfo`).then(res => {
            this.setState({
                userInfo: res.data
            })
        })
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.video_id !== this.props.video_id) {
            this.getComments()
        }
    }
    signIn() {
        let { REACT_APP_DOMAIN, REACT_APP_CLIENT_ID } = process.env;
        let uri = `${encodeURIComponent(window.location.origin)}/auth/callback`
        document.cookie = `redirecturl=${this.props.match};`
        window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${uri}&response_type=code`
    }
    getComments = () => {
        axios.get(`/api/comments/${this.props.video_id}`).then(res => {
            // axios.get(`/api/userinfo`).then(res => {
            this.setState({
                comments: res.data
            })
        })
    }
    handleCommentInput(e) {
        this.setState({
            commentInput: e.target.value
        })
    }
    createComment() {
        if (this.state.commentInput === '') {
            this.setState({ commentPlaceHolder: "Comment is empty, please include text to post." })
            setTimeout(() => {
                this.setState({ commentPlaceHolder: "Add a public comment..." })
            }, 3000);
        } else {
            axios.post('/api/createcomment', { video_id: this.props.video_id, comment: this.state.commentInput, user_id: this.state.userInfo.user_id })
                .then(res => {
                    this.setState({
                        comments: res.data,
                        commentInput: ''
                    })
                })
        }
    }
    deleteComment(comment_id, user_id) {
        console.log(comment_id, user_id)
        axios.delete(`/api/deletecomment/${comment_id}/${user_id}/${this.props.video_id}`).then(res=>{
            this.setState({
                comments: res.data
            })
        })
    }
    render() {
        let commentsDisplay = this.state.comments.map((comment, i) => {
            let deleteButton = <div></div>
            if (comment.user_id === this.state.userInfo.user_id) {
                deleteButton = <div>
                    <button  id="com-delete" onClick={() => this.deleteComment(comment.comment_id, this.state.userInfo.user_id)}>Delete Comment</button>
                </div>
            }
            return (
                <div className="comments-main" key={i}>
                    <div>
                        <div><img id="com-pic" src={comment.user_img} alt="user"></img></div>
                    </div>
                    <div className="author-n-com">
                        <h3 id="com-author">{comment.first_name} {comment.last_name}</h3>
                        <p class="comment-area">{comment.comment}</p>
                        <div>{deleteButton}</div>
                    </div>
                </div>
            )
        })
        let comment = <div />
        if (Object.keys(this.state.userInfo).length !== 0) {
            comment = <div className="add-comment">
                <div>
                    <img id="com-pic" src={this.state.userInfo.user_img} alt='user'></img>
                </div>
                <input id="comment-field" onChange={e => this.handleCommentInput(e)} value={this.state.commentInput} placeholder={this.state.commentPlaceHolder}></input>
                <button id="button-add-com" onClick={this.createComment}>Add Comment</button>
            </div>
        }
        else {
            comment = <div className="log-comment">
                <button id="log-com-button" onClick={this.signIn}>Login to post a comment</button>
            </div>
        }
        return (
            <div className='comments'>
                <div>
                    <h1>{this.state.comments.length} Comments</h1>
                </div>
                <br />
                <div>
                    {/* <img src={this.state.userInfo.picture} alt='user'></img>
                    <input placeholder='Add a public comment...'></input> */}
                    {comment}
                </div>
                <div>
                    {commentsDisplay}
                </div>
            </div>
        )
    }
}

export default Comments;