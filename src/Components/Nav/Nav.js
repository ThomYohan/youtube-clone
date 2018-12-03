import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css'
import pic from './icons8-search-24.png'
import pic2 from './add video.svg'


class Nav extends Component {
    constructor(){
        super()
        this.state = {
            showDrawer: false,
            showUpload: false,
            toggleSignIn: ''
        }
    }
    render(){
        return(
            <div className='nav'>
                <div className="menu2">
                    <button className="hamburger"><i id="menu" className="fas fa-bars"></i></button>
                </div>

        <div id="youtube">
                <div>
                   <Link to='/'><i id="icon" className="fab fa-youtube"></i></Link> 
                </div>
                <div>
                    <h3 className="utube">U-Tube</h3>
                </div>
        </div>

        <div id="search">
                <div>
                    <input id="search-field" type="text" placeholder="Search"/>
                </div>
                <div>
                   <button className="search-button"><img src={pic} alt=""/></button>
                </div>
        </div>

        <div id="buttons">
                <div>
                    <button className="add-video"><img src={pic2} alt=""/></button>
                </div>
                <div>
                    <button className="sign-in">SIGN IN</button>
                </div>
        </div>       

            </div>
        )
    }
}

export default Nav;