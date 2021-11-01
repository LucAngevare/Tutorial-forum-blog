import React, { Component } from 'react'
import logo from "../assets/images/logo.svg"

class NavBar extends Component {
    render() {
        return (
            <div className="topnav">
                <a href="/" className="logo-wrapper">
                    <img src={logo} className="logo" alt="logo" id="logo"/>
                </a>
                <span className="title">
                    <span className="title-1">Luc's</span>
                    <span className="title-2">blog</span>
                </span>
                <input type="text" className="search" id="search" placeholder="Search"/>
                <a href="/post" className="add">+</a>
            </div>
        )
    }
}

export default NavBar;