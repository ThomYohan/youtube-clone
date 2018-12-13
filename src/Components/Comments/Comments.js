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
        this.createComment = this.createComment.bind(this)
        this.signIn = this.signIn.bind(this)
    }
    componentDidMount() {
        this.getComments()
        axios.get(`/api/userinfo`).then(res=>{
            this.setState({
                userInfo: res.data
            })
        })
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.video_id !== this.props.video_id){
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
    handleCommentInput(e){
        this.setState({
            commentInput: e.target.value
        })
    }
    createComment() {
        axios.post('/api/createcomment', { video_id: this.props.video_id, comment: this.state.commentInput, user_id: this.state.userInfo.user_id })
        .then(axios.get(`/api/comments/${this.props.video_id}`).then(res => {
            this.setState({
                comments: res.data
            })
        }))
    }
    render() {
        console.log(this.props.match)
        let commentsDisplay = this.state.comments.map((comment, i) => {
            return (
                <div className="comments-main" key={i}>
                    <div>
                        <div><img id="com-pic"src={comment.user_img } alt="user"></img></div>
                    </div>
                    <div className="author-n-com">
                        <h3 id="com-author">{comment.first_name} {comment.last_name}</h3>
                        <div>{comment.comment}</div>
                    </div>
                </div>
            )
        })
        let comment = <div />
        if (Object.keys(this.state.userInfo).length !== 0) {
            comment = <div className="add-comment">
                <div>
                    <img id="com-pic" src={this.state.userInfo.user_img}></img>
                </div>
                <input id="comment-field" onChange={e=>this.handleCommentInput(e)} placeholder='Add a public comment...'></input>
                <button onClick={this.createComment}>Add Comment</button>
            </div>
        }
        else {
            comment = <div>
                <button onClick={this.signIn}>Login to post a comment.</button>
            </div>
        }
        return (
            <div className='comments'>
                <div>
                    <h1>{this.state.comments.length} Comments</h1>
                </div>
                <br/>
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