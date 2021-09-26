import React, { Component } from 'react'

import Logo from './Logo'
import Links from './Links'

class NavBar extends Component {
    render() {
        return (
            <div className="container">
                <div className="navbar">
                    <Logo />
                    <Links />
                </div>
            </div>
        )
    }
}

export default NavBar