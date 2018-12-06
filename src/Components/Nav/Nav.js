import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css'
import pic from './icons8-search-24.png'
import pic2 from './add video.svg'
import axios from 'axios';


class Nav extends Component {
    constructor() {
        super()
        this.state = {
            showDrawer: false,
            showUpload: false,
            toggleSignIn: '',
            searchField: '',
            signedIn: false,
            email: '',
            firstName: '',
            lastName: '',
            image: '',
            showMenu: false
        }
        this.handleInput = this.handleInput.bind(this)
    }

    signIn() {
        let { REACT_APP_DOMAIN, REACT_APP_CLIENT_ID } = process.env;

        let uri = `${encodeURIComponent(window.location.origin)}/auth/callback`

        window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${uri}&response_type=code`
    }

    signOut = () => {
        axios.post('/api/auth/signout').then(res => {
            console.log('Sign Out Successful')
            window.location.reload()
        })
    }

    handleSearch = (e) => {
        this.setState({
            searchField: e.target.value
        })
        this.props.search(e.target.value)
    }

    // handleClick = () => {

    // }

    componentDidMount() { 
        this.getUser()
    }

    getUser = () => {
        axios.get('/api/userinfo').then(res => {
            console.log(res)
            if (res.data !== '') {
                this.setState({
                    signedIn: true,
                    email: res.data.email,
                    firstName: res.data.first_name,
                    lastName: res.data.last_name,
                    image: res.data.user_img
                })
            } else {
                this.setState({
                    signedIn: false
                })
            }
        })
    }

    toggleUserMenu = () => {
        this.setState({
            showMenu: !this.state.showMenu
        })
    }

    render() {
        return (
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
                        <input id="search-field" value={this.state.searchField} onChange={this.handleSearch} type="text" placeholder="Search" />
                    </div>
                    <div>
                        <Link to='/search'><button className="search-button"><img src={pic} alt="" /></button></Link>
                    </div>
                </div>

                <div id="buttons">
                    <div>
                        <Link to='/upload'>
                            <button className="add-video">
                                <img src={pic2} alt="" /></button>
                        </Link>
                    </div>
                    <div>
                        {
                            this.state.signedIn
                                ?
                                <div>
                                    <button className='user-btn'>
                                        <img onClick={() => this.toggleUserMenu()} className='user-image' src={this.state.image} alt="user" />
                                    </button>
                                    {
                                        this.state.showMenu 
                                        ?
                                        <div className='user-menu'>
                                        <div className='user-account'>
                                            <div className='user-image-container'><img className='menu-image' src={this.state.image} alt="" /></div>
                                            <div className='user-account-text'>
                                                <div className='user-name' >{this.state.firstName} {this.state.lastName}</div>
                                                <div className='user-email' >{this.state.email}</div>
                                            </div>
                                        </div>
                                        <Link to='/channel'><div className='menu-channel'>
                                            <div className='menu-icon'>
                                                <i className="fas fa-user"></i>
                                            </div>
                                            My Channel
                                        </div>
                                        </Link>
                                        <div onClick={() => this.signOut()} className='menu-sign-out'>
                                            <div className='menu-icon'>
                                                <i className="fas fa-sign-out-alt"></i>
                                            </div>
                                            SIGN OUT
                                        </div>
                                    </div>
                                        :
                                        null
                                    }                      
                                </div>
                                :
                                <button onClick={() => this.signIn()} className="sign-in">
                                    SIGN IN
                            </button>
                        }
                    </div>
                    <div>
                        {this.state.firstName} {this.state.lastName}
                    </div>
                </div>
            </div>
        )
    }
}

export default Nav;

