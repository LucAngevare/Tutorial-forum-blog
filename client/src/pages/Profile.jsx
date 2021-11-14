import React, { Component } from "react";
import api from '../api'
import md5Hex from 'md5-hex'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.username = React.createRef();
        this.password = React.createRef();
        this.checkLogin = this.checkLogin.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    checkLogin = (event) => {
        event.preventDefault();
        const username = this.username.current.value;
        const password = md5Hex(this.password.current.value); //Hashing to md5 in declaration so looking at RAM data can't reveal any passwords

        const reg = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/g)
        new Promise((resolve, reject) => {
	    if (reg.test(username)) { //reg.test(username) == true means an email-address has been entered instead of a username
                api.checkLogin({
                    email: username,
                    password: password
                }).then((res) => {
                    console.log(res)
                    if (res.data["success"]) return localStorage.setItem("User-ID", res.data["ID"])
                })
            } else {
                api.checkLogin({
                    username: username,
                    password: password
                }).then((res) => {
                    console.log(res)
                    if (res.data["success"]) return localStorage.setItem("User-ID", res.data["ID"])
                }) //Messy code but I was so stupid to think I could fit in a whole user IDing system with less than a week left to program
            }
	}).then(() => window.location = "/profile/" + localStorage.getItem("User-ID"))
    }

    signUp = (event) => {
        event.preventDefault();
        window.location.href= '/signup'
    }
    render() {
        return(
            <>
                <div className="main-content">
                    <h1 className="post-title">Log in:</h1>
                    <div className="post-form">
                        <form id="postForm" onSubmit={this.checkLogin}>
                            <input className="profile-details username" type="text" ref={this.username} placeholder="Voer uw e-mail-adres of gebruikersnaam in"/><br/>
                            <input className="profile-details password" type="password" ref={this.password} placeholder="Uw wachtwoord"/><br/>
                            <input className="profile-details login" type="submit" value="Log in"/><br></br>
                        </form>
                        <input className="profile-details signup" onClick={this.signUp} type="submit" value="Of activeer uw account"/>
                    </div>
                </div>
            </>
        )
    }
}

export default Profile;
