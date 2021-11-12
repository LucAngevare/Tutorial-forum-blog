import React, { Component } from 'react'
import logo from "../assets/images/logo.svg"

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.home = this.home.bind(this);
        this.home.bind(this)
    }
    Addition(props) {
        if (localStorage.getItem("User-ID") !== "null") {
            return (<a href="/post" className="add">+</a>)
        } else {
            return (<a onClick={onclickEv} className="add">+</a>)
        }
        function onclickEv(event) {
            window.alert("Log alstublieft eerst in, dit kunt u door op de cirkel rechtsboven te klikken.")
        }
    }

    home = (event) => {
        event.preventDefault()
        window.location='/'
    }

    render() {
        return (
            <div className="topnav">
                <a href="/" className="logo-wrapper">
                    <img src={logo} className="logo" alt="logo" id="logo"/>
                </a>
                <span className="title" onClick={this.home}>
                    <span className="title-1">Luc's</span>
                    <span className="title-2">blog</span>
                </span>
                <input type="text" className="search" id="search" placeholder="Search"/>
                <this.Addition/>
                <a href={"/profile/" + localStorage.getItem("User-ID")} className="profile-link">
                    <img className="profile-icon" alt="icon"/>
                </a>
            </div>
        )
    }
}

export default NavBar;