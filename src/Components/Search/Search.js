import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './Search.css'

class Search extends Component {
    constructor(){
        super()
        this.state = {
            searchVideos: []
        }
    }
    
    getSearch = () => {
        let {searchString} = this.props.match.params;
        axios.post('/api/search', {searchString}).then(res => {
            console.log(3433, res.data)
            this.setState({
                searchVideos: res.data
            })
        })
    }
    componentDidMount(){
        this.getSearch()
    }
    componentDidUpdate(prevProps){
        if(prevProps !== this.props){
            this.getSearch()
        }
    }

    render(){
        console.log(111, this.props)
        let searchDisplay = this.state.searchVideos.map((vids, i) => {
            return (
                <div className="search-list" key={i}>
                        <Link to={`/video/${vids.video_id}`}><video id="thumbnail" src={vids.video_url}></video></Link>
                    <div className="title-descrip">
                        <h3>{vids.title}</h3>
                        <div className="what-what">
                            <p id="search-auth">{vids.channel_name}</p>
                            <p id="search-views">{vids.view_count} views</p>
                        </div>
                        <p id="search-descrip">{vids.video_desc}</p>
                        <p id="vids-dur">{vids.duration}</p>
                    </div>
                </div>
            )
        })

        return(
            <div className="Search">
                {searchDisplay}
            </div>
        )
    }
}

export default Search;