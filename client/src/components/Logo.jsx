import React, { Component } from 'react'
import logo from '../logo.svg'

class Logo extends Component {
    render() {
        return (
            <div className="logo-parent">
                <a href="https://blog.lucangevare.nl" className="logo-link">
                    <img src={logo} width="50" height="50" alt="blog.lucangevare.nl" className="logo"/>
                </a>
            </div>
        )
    }
}

export default Logo

//TODO: Create and upload .svg (own?) and come up with a better name for the alt