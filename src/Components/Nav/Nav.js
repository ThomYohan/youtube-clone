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
            toggleSignIn: '',
            searchString: ''
        }
        this.handleInput = this.handleInput.bind(this)
    }

    signIn(){
        let {REACT_APP_DOMAIN, REACT_APP_CLIENT_ID} = process.env;
        
        let uri = `${encodeURIComponent(window.location.origin)}/auth/callback`

        window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${uri}&response_type=code`
    }

    handleInput(event){
        this.setState({[event.target.name]: event.target.value})
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
                        <input id="search-field" type="text" name="searchString" placeholder="Search" onChange={this.handleInput}/>
                    </div>
                    <div>
                        <button className="search-button"><img src={pic} alt="search-button"/></button>
                    </div>
                </div>

                <div id="buttons">
                    <div>
                        <Link to='/upload'>
                        <button className="add-video">
                        <img src={pic2} alt="upload-button"/></button>
                        </Link>
                    </div>
                    <div>
                        <button onClick={() => this.signIn()} className="sign-in">SIGN IN</button>
                    </div>
                </div>       

            </div>
        )
    }
}

export default Nav;