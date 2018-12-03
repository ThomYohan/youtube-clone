import React, { Component } from 'react';
import './Comments.css'


class Comments extends Component {
    constructor(){
        super()
        this.state = {
            userInfo: {},
            comments: {},
            writeComment: false
        }
    }
    componentDidMount(){
        axios.get(`/api/comments/${video_id}`).then(res => {
            this.setState({
                comments: res.data
            })
        })
    }
    render(){
        return(
            <div className='comments'>
                <div>
                    <h1>Comments: </h1>
                </div>
                <div>
                    <input>

                    </input>
                    <input placeholder='Add a public comment...'></input>
                </div>
                <div>

                </div>
            </div>
        )
    }
}

export default Nav;