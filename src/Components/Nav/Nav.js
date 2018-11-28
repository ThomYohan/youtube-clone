import React, { Component } from 'react';


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
                    <i className="fab fa-youtube"></i>
                </div>
            </div>
        )
    }
}

export default Nav;