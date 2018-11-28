import React, { Component } from 'react';
import './Nav.css'


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
                <div>

                </div>
                <div>
                    <i id="icon" class="fab fa-youtube"></i>
                </div>
                <div>
                    <h3>YouTube-Clone</h3>
                </div>
                <div>
                    <input type="text"/>
                </div>
                <div>

                </div>
                <div>
                    <button>Login</button>
                </div>
            </div>
        )
    }
}

export default Nav;